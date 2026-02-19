
Add-Type -AssemblyName System.Drawing
$imagePath = "d:\BBS Mart\antigravity-demo\public\logo.jpeg"

if (-not (Test-Path $imagePath)) {
    Write-Host "File not found"
    exit
}

try {
    $img = [System.Drawing.Bitmap]::FromFile($imagePath)
    $x = [int]($img.Width / 2)
    $y = [int]($img.Height / 2)
    $pixel = $img.GetPixel($x, $y)
    Write-Host "$($pixel.R),$($pixel.G),$($pixel.B)"
    $img.Dispose()
} catch {
    Write-Host "Error: $_"
}
