# Build script for Golf Physics Core

Write-Host "Compiling Rust to WASM..." -ForegroundColor Green

# Ensure we have the target
rustup target add wasm32-unknown-unknown

# Check for wasm-pack
if (!(Get-Command wasm-pack -ErrorAction SilentlyContinue)) {
    Write-Host "wasm-pack not found. Installing..."
    cargo install wasm-pack
}

# Build
wasm-pack build --target web --release

Write-Host "Build complete! Output in ./pkg/" -ForegroundColor Cyan
