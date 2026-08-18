param(
  [ValidateSet('free','pro')] [string]$Variant = 'free',
  [ValidateSet('apk','aab')] [string]$Artifact = 'apk',
  [switch]$DevelopmentAds
)
$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$credentialsPath = Join-Path $projectRoot "credentials\android-$Variant.json"
$versionsPath = Join-Path $projectRoot 'build-versions.json'
$versions = Get-Content -Raw -LiteralPath $versionsPath | ConvertFrom-Json
if (-not (Test-Path -LiteralPath $credentialsPath)) { throw "Falta $credentialsPath. Descarga primero las credenciales desde EAS." }
$credentials = Get-Content -Raw -LiteralPath $credentialsPath | ConvertFrom-Json
$key = $credentials.android.keystore
if (-not $key) { throw 'El archivo de credenciales no contiene android.keystore.' }
$sourceKey = if ([IO.Path]::IsPathRooted($key.keystorePath)) { $key.keystorePath } else { Join-Path $projectRoot $key.keystorePath }
if (-not (Test-Path -LiteralPath $sourceKey)) { throw "No se encontro el keystore: $sourceKey" }
$env:APP_VARIANT = $Variant
$env:APP_PLATFORM = 'android'
$env:APP_ENV = if ($DevelopmentAds) { 'development' } else { 'production' }
$env:LOCAL_ANDROID_SIGNING = 'true'
$env:ANDROID_VERSION_CODE = if ($Variant -eq 'free') { [string]$versions.androidFree } else { [string]$versions.androidPro }
Push-Location $projectRoot
try {
  $androidDirectory = Join-Path $projectRoot 'android'
  $existingGradle = Join-Path $androidDirectory 'gradlew.bat'
  if (Test-Path -LiteralPath $existingGradle) {
    Push-Location $androidDirectory
    try { & $existingGradle --stop | Out-Host } finally { Pop-Location }
  }
  # Incremental prebuild avoids deleting files that Android Studio, Java or antivirus may lock on Windows.
  & npx expo prebuild --platform android --no-install
  if ($LASTEXITCODE -ne 0) { throw 'Expo prebuild fallo.' }
  $destinationKey = Join-Path $projectRoot 'android\app\maomec-upload.jks'
  Copy-Item -LiteralPath $sourceKey -Destination $destinationKey -Force
  $gradle = Join-Path $projectRoot 'android\gradlew.bat'
  $task = if ($Artifact -eq 'apk') { 'assembleRelease' } else { 'bundleRelease' }
  Push-Location (Join-Path $projectRoot 'android')
  try {
    & $gradle $task "-PMAOMEC_UPLOAD_STORE_FILE=maomec-upload.jks" "-PMAOMEC_UPLOAD_STORE_PASSWORD=$($key.keystorePassword)" "-PMAOMEC_UPLOAD_KEY_ALIAS=$($key.keyAlias)" "-PMAOMEC_UPLOAD_KEY_PASSWORD=$($key.keyPassword)"
  } finally {
    Pop-Location
  }
  if ($LASTEXITCODE -ne 0) { throw 'Gradle no pudo generar el artefacto.' }
  if ($Variant -eq 'free') { $versions.androidFree = [int]$versions.androidFree + 1 } else { $versions.androidPro = [int]$versions.androidPro + 1 }
  $versions | ConvertTo-Json | Set-Content -LiteralPath $versionsPath -Encoding utf8
  Write-Host "Build terminado en android\app\build\outputs" -ForegroundColor Green
} finally {
  Pop-Location
  Remove-Item Env:LOCAL_ANDROID_SIGNING -ErrorAction SilentlyContinue
}
