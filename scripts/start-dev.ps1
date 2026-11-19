
$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $projectRoot ".env.local"

if (-not (Test-Path -LiteralPath $envFile -PathType Leaf)) {
    throw "No se encontro .env.local en la raiz del proyecto."
}

Write-Host ""
Write-Host "FORMA Studio - Entorno local" -ForegroundColor Cyan
Write-Host "Cargando variables privadas..." -ForegroundColor Gray

$lines = [System.IO.File]::ReadAllLines(
    $envFile,
    [System.Text.Encoding]::UTF8
)

foreach ($line in $lines) {
    $trimmed = $line.Trim()

    if (
        [string]::IsNullOrWhiteSpace($trimmed) -or
        $trimmed.StartsWith("#")
    ) {
        continue
    }

    if ($trimmed -notmatch '^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$') {
        continue
    }

    $name = $Matches[1]
    $value = $Matches[2].Trim()

    if ($value.Length -ge 2) {
        $isDoubleQuoted = (
            $value.StartsWith('"') -and
            $value.EndsWith('"')
        )

        $isSingleQuoted = (
            $value.StartsWith("'") -and
            $value.EndsWith("'")
        )

        if ($isDoubleQuoted -or $isSingleQuoted) {
            $value = $value.Substring(
                1,
                $value.Length - 2
            )
        }
    }

    [System.Environment]::SetEnvironmentVariable(
        $name,
        $value,
        "Process"
    )
}

$requiredVariables = @(
    "SMTP_USER",
    "SMTP_APP_PASSWORD",
    "FORM_RECIPIENT",
    "ALLOWED_ORIGINS"
)

foreach ($name in $requiredVariables) {
    $value = [System.Environment]::GetEnvironmentVariable(
        $name,
        "Process"
    )

    if ([string]::IsNullOrWhiteSpace($value)) {
        throw "Falta configurar la variable: $name"
    }

    if ($value -match '^(TU_|COLOCAR_AQUI)') {
        throw "La variable $name todavia contiene un valor de ejemplo."
    }

    Write-Host "$name cargada correctamente." -ForegroundColor Green
}

if ($env:ALLOWED_ORIGINS -notlike "*http://localhost:3000*") {
    throw "ALLOWED_ORIGINS debe incluir http://localhost:3000"
}

Write-Host ""
Write-Host "Las variables estan listas. No se mostraron credenciales." -ForegroundColor Green
Write-Host "Iniciando Vercel en http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

Set-Location $projectRoot

& npx vercel dev --listen 3000

if ($LASTEXITCODE -ne 0) {
    throw "Vercel termino con el codigo $LASTEXITCODE."
}
