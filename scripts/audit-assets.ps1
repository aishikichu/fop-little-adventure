$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$outputDir = Join-Path $projectRoot 'docs/asset-review'
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
$rows = @()
foreach ($folder in @('references', 'public/assets')) {
  foreach ($file in Get-ChildItem -LiteralPath (Join-Path $projectRoot $folder) -Recurse -File) {
    $relative = [IO.Path]::GetRelativePath($projectRoot, $file.FullName).Replace('\','/')
    $width = $null; $height = $null
    if ($file.Extension.ToLower() -in @('.png','.gif','.jpg','.jpeg')) {
      $bitmap = [Drawing.Image]::FromFile($file.FullName)
      $width = $bitmap.Width; $height = $bitmap.Height; $bitmap.Dispose()
    }
    $rows += [pscustomobject]@{path=$relative;width=$width;height=$height;bytes=$file.Length;sha256=(Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash}
  }
}
$rows | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $outputDir 'inventory.json')
$rows | Export-Csv -NoTypeInformation -LiteralPath (Join-Path $outputDir 'inventory.csv')
$groups = @{
  references = @($rows | Where-Object {$_.path.StartsWith('references/') -and $_.width})
  characters = @($rows | Where-Object {$_.path.StartsWith('public/assets/characters/') -and $_.width})
  scenery = @($rows | Where-Object {$_.path.StartsWith('public/assets/') -and !$_.path.StartsWith('public/assets/characters/') -and $_.width})
}
foreach ($group in $groups.GetEnumerator()) {
  $items = @($group.Value | Sort-Object path)
  $sheet = [Drawing.Bitmap]::new(1000, [int]([Math]::Ceiling($items.Count / 5.0) * 156))
  $g = [Drawing.Graphics]::FromImage($sheet)
  $g.Clear([Drawing.Color]::FromArgb(37,39,52))
  $g.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
  $font = [Drawing.Font]::new('Consolas',8)
  for ($i=0; $i -lt $items.Count; $i++) {
    $item=$items[$i]; $x=($i%5)*200; $y=[Math]::Floor($i/5)*156
    $img=[Drawing.Image]::FromFile((Join-Path $projectRoot $item.path))
    $scale=[Math]::Min(184.0/$img.Width,110.0/$img.Height)
    $w=[int]($img.Width*$scale);$h=[int]($img.Height*$scale)
    $g.DrawImage($img,[Drawing.Rectangle]::new([int]($x+(200-$w)/2),[int]$y,$w,$h))
    $label=$item.path.Replace('references/public/asset/','').Replace('Sprout Lands - Sprites - Basic pack/','').Replace('public/assets/','')
    $g.DrawString($label,$font,[Drawing.Brushes]::White,[Drawing.RectangleF]::new($x+4,$y+112,192,42))
    $img.Dispose()
  }
  $sheet.Save((Join-Path $outputDir ($group.Key+'.png')),[Drawing.Imaging.ImageFormat]::Png)
  $font.Dispose();$g.Dispose();$sheet.Dispose()
}
Write-Output "Inventoried $($rows.Count) assets. Contact sheets: docs/asset-review/"
