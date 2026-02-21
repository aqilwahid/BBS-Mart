# Script Deployment Portofolio BBS Mart ke VPS
# IP: 31.97.222.203

$IP = "31.97.222.203"
$USER = "aqil"
$DEST_DIR = "~/bbs-mart-portofolio"

Write-Host "Menyiapkan Direktori di VPS..." -ForegroundColor Green
ssh -o StrictHostKeyChecking=no ${USER}@${IP} "mkdir -p ${DEST_DIR}"

Write-Host "Menyalin file project ke VPS..." -ForegroundColor Green
scp -r -o StrictHostKeyChecking=no "Logo Home.png" "BBS Mart Landing Page.png" "presentation.html" "presentation_script.js" "presentation_style.css" "index.html" ${USER}@${IP}:${DEST_DIR}

Write-Host "Deployment Selesai! File berada di $DEST_DIR pada VPS." -ForegroundColor Cyan
Write-Host "Untuk domain gratisan tanpa bayar VPS, bisa gunakan hosting statis (GitHub Pages / Vercel)." -ForegroundColor Yellow
