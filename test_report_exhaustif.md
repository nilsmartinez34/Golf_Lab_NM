# Rapport de Test Physique Exhaustif - V8 (Modern/Power Specs)

Ce rapport présente les résultats détaillés de la simulation pour chaque club, scénario météo et type de coup.

> [!NOTE]
> **Moteur Physique V2** : Tuning "Juste Milieu" (Lift Base 0.09) + Spin Factor 5.5.
> **Vitesse Club** : Variable selon le club (Dr: 105 MPH ... LW: 72 MPH).
> **Vent** : 5 m/s (18 km/h) pour les tests venteux.

## Index des Clubs & Vitesses
- **Dr**: Speed 105 MPH, Loft 10.5°, Smash 1.49, AoA 3°
- **3W**: Speed 100 MPH, Loft 15°, Smash 1.47, AoA -1°
- **4i**: Speed 92 MPH, Loft 21°, Smash 1.43, AoA -2.5°
- **5i**: Speed 90 MPH, Loft 24°, Smash 1.39, AoA -3°
- **6i**: Speed 88 MPH, Loft 27°, Smash 1.36, AoA -3.5°
- **7i**: Speed 85 MPH, Loft 30.5°, Smash 1.33, AoA -4°
- **8i**: Speed 82 MPH, Loft 35°, Smash 1.29, AoA -4.5°
- **9i**: Speed 80 MPH, Loft 39.5°, Smash 1.25, AoA -5°
- **PW**: Speed 78 MPH, Loft 44°, Smash 1.2, AoA -5.5°
- **SW**: Speed 75 MPH, Loft 54°, Smash 1.08, AoA -6°
- **LW**: Speed 72 MPH, Loft 58°, Smash 1.02, AoA -6°

---

## Club: Dr

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 10.4° | **243.1** | 286.5 | 28.6 | 1917/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 8.9° | **231.1** | 282.7 | 21.3 | 1530/0 | -20.1 |
| SeaLevelNoWind | Pull Hook | 7.4° | **208.6** | 272.8 | 14.0 | 1115/247 | -19.9 |
| SeaLevelNoWind | Pull Slice | 10.4° | **240.4** | 284.7 | 27.7 | 1871/-415 | -27.6 |
| SeaLevelNoWind | Push Straight | 11.9° | **248.3** | 285.9 | 36.2 | 2304/0 | 21.6 |
| SeaLevelNoWind | Push Hook | 10.4° | **240.4** | 284.7 | 27.7 | 1871/415 | 27.6 |
| SeaLevelNoWind | Push Slice | 13.4° | **246.4** | 280.4 | 42.3 | 2628/-583 | 7.2 |
| SeaLevelNoWind | Straight Hook | 8.9° | **228.1** | 280.7 | 20.5 | 1493/331 | 2.2 |
| SeaLevelNoWind | Straight Slice | 11.9° | **246.0** | 284.3 | 35.1 | 2250/-499 | -10.8 |
| SeaLevelBackWind | Straight | 10.4° | **253.4** | 311.0 | 25.0 | 1917/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 8.9° | **236.4** | 303.0 | 18.3 | 1530/0 | -19.7 |
| SeaLevelBackWind | Pull Hook | 7.4° | **208.4** | 288.0 | 12.0 | 1115/247 | -21.3 |
| SeaLevelBackWind | Pull Slice | 10.4° | **250.1** | 308.4 | 24.2 | 1871/-415 | -23.8 |
| SeaLevelBackWind | Push Straight | 11.9° | **263.2** | 314.3 | 32.0 | 2304/0 | 21.6 |
| SeaLevelBackWind | Push Hook | 10.4° | **250.1** | 308.4 | 24.2 | 1871/415 | 23.8 |
| SeaLevelBackWind | Push Slice | 13.4° | **265.3** | 312.0 | 37.8 | 2628/-583 | 11.6 |
| SeaLevelBackWind | Straight Hook | 8.9° | **233.0** | 300.7 | 17.7 | 1493/331 | -0.6 |
| SeaLevelBackWind | Straight Slice | 11.9° | **260.9** | 312.5 | 31.0 | 2250/-499 | -6.9 |
| SeaLevelFrontWind | Straight | 10.4° | **227.0** | 256.9 | 32.6 | 1917/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 8.9° | **220.7** | 257.9 | 24.5 | 1530/0 | -20.5 |
| SeaLevelFrontWind | Pull Hook | 7.4° | **204.1** | 252.8 | 16.3 | 1115/247 | -18.1 |
| SeaLevelFrontWind | Pull Slice | 10.4° | **225.2** | 256.3 | 31.4 | 1871/-415 | -31.5 |
| SeaLevelFrontWind | Push Straight | 11.9° | **227.6** | 252.8 | 40.8 | 2304/0 | 21.6 |
| SeaLevelFrontWind | Push Hook | 10.4° | **225.2** | 256.3 | 31.4 | 1871/415 | 31.5 |
| SeaLevelFrontWind | Push Slice | 13.4° | **222.0** | 244.5 | 47.1 | 2628/-583 | 2.4 |
| SeaLevelFrontWind | Straight Hook | 8.9° | **218.1** | 256.3 | 23.6 | 1493/331 | 5.4 |
| SeaLevelFrontWind | Straight Slice | 11.9° | **225.9** | 251.8 | 39.4 | 2250/-499 | -15.1 |
| SeaLevelLeftWind | Straight | 10.4° | **243.4** | 287.5 | 28.8 | 1917/0 | 15.3 |
| SeaLevelLeftWind | Pull Straight | 8.9° | **230.7** | 281.5 | 21.6 | 1530/0 | -7.6 |
| SeaLevelLeftWind | Pull Hook | 7.4° | **210.4** | 274.1 | 14.5 | 1115/247 | -10.4 |
| SeaLevelLeftWind | Pull Slice | 10.4° | **237.2** | 279.3 | 27.7 | 1871/-415 | -12.7 |
| SeaLevelLeftWind | Push Straight | 11.9° | **250.2** | 289.8 | 36.0 | 2304/0 | 39.3 |
| SeaLevelLeftWind | Push Hook | 10.4° | **244.3** | 291.8 | 27.9 | 1871/415 | 42.8 |
| SeaLevelLeftWind | Push Slice | 13.4° | **245.6** | 279.4 | 41.4 | 2628/-583 | 26.8 |
| SeaLevelLeftWind | Straight Hook | 8.9° | **230.7** | 284.7 | 20.9 | 1493/331 | 14.9 |
| SeaLevelLeftWind | Straight Slice | 11.9° | **243.6** | 280.7 | 34.7 | 2250/-499 | 6.6 |
| SeaLevelRightWind | Straight | 10.4° | **243.4** | 287.5 | 28.8 | 1917/0 | -15.3 |
| SeaLevelRightWind | Pull Straight | 8.9° | **232.1** | 285.4 | 21.1 | 1530/0 | -32.4 |
| SeaLevelRightWind | Pull Hook | 7.4° | **207.5** | 272.7 | 13.7 | 1115/247 | -28.8 |
| SeaLevelRightWind | Pull Slice | 10.4° | **244.3** | 291.8 | 27.9 | 1871/-415 | -42.8 |
| SeaLevelRightWind | Push Straight | 11.9° | **247.1** | 284.4 | 36.7 | 2304/0 | 3.5 |
| SeaLevelRightWind | Push Hook | 10.4° | **237.2** | 279.3 | 27.7 | 1871/415 | 12.7 |
| SeaLevelRightWind | Push Slice | 13.4° | **248.5** | 284.6 | 43.6 | 2628/-583 | -13.8 |
| SeaLevelRightWind | Straight Hook | 8.9° | **226.7** | 278.5 | 20.3 | 1493/331 | -9.7 |
| SeaLevelRightWind | Straight Slice | 11.9° | **249.5** | 290.4 | 35.8 | 2250/-499 | -29.1 |
| HighAltitudeNoWind | Straight | 10.4° | **258.6** | 319.8 | 22.9 | 1917/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 8.9° | **237.5** | 309.6 | 16.5 | 1530/0 | -20.7 |
| HighAltitudeNoWind | Pull Hook | 7.4° | **205.8** | 292.8 | 10.6 | 1115/247 | -23.6 |
| HighAltitudeNoWind | Pull Slice | 10.4° | **255.1** | 317.4 | 22.2 | 1871/-415 | -22.6 |
| HighAltitudeNoWind | Push Straight | 11.9° | **273.0** | 325.7 | 30.0 | 2304/0 | 23.8 |
| HighAltitudeNoWind | Push Hook | 10.4° | **255.1** | 317.4 | 22.2 | 1871/415 | 22.6 |
| HighAltitudeNoWind | Push Slice | 13.4° | **278.3** | 325.2 | 36.3 | 2628/-583 | 16.1 |
| HighAltitudeNoWind | Straight Hook | 8.9° | **234.1** | 307.3 | 16.0 | 1493/331 | -3.1 |
| HighAltitudeNoWind | Straight Slice | 11.9° | **269.9** | 323.5 | 29.1 | 2250/-499 | -4.4 |
| HighAltitudeBackWind | Straight | 10.4° | **260.2** | 335.9 | 20.1 | 1917/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 8.9° | **235.1** | 321.6 | 14.4 | 1530/0 | -19.9 |
| HighAltitudeBackWind | Pull Hook | 7.4° | **200.3** | 301.0 | 9.3 | 1115/247 | -23.9 |
| HighAltitudeBackWind | Pull Slice | 10.4° | **256.5** | 333.0 | 19.5 | 1871/-415 | -19.1 |
| HighAltitudeBackWind | Push Straight | 11.9° | **278.9** | 345.6 | 26.5 | 2304/0 | 23.3 |
| HighAltitudeBackWind | Push Hook | 10.4° | **256.5** | 333.0 | 19.5 | 1871/415 | 19.1 |
| HighAltitudeBackWind | Push Slice | 13.4° | **288.4** | 348.8 | 32.4 | 2628/-583 | 19.8 |
| HighAltitudeBackWind | Straight Hook | 8.9° | **231.5** | 319.1 | 14.0 | 1493/331 | -5.1 |
| HighAltitudeBackWind | Straight Slice | 11.9° | **275.5** | 343.0 | 25.8 | 2250/-499 | -0.8 |
| HighAltitudeFrontWind | Straight | 10.4° | **252.0** | 298.8 | 26.1 | 1917/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 8.9° | **235.7** | 293.1 | 18.9 | 1530/0 | -21.4 |
| HighAltitudeFrontWind | Pull Hook | 7.4° | **208.7** | 281.1 | 12.2 | 1115/247 | -22.9 |
| HighAltitudeFrontWind | Pull Slice | 10.4° | **249.1** | 297.3 | 25.2 | 1871/-415 | -26.4 |
| HighAltitudeFrontWind | Push Straight | 11.9° | **261.5** | 300.6 | 33.9 | 2304/0 | 24.1 |
| HighAltitudeFrontWind | Push Hook | 10.4° | **249.1** | 297.3 | 25.2 | 1871/415 | 26.4 |
| HighAltitudeFrontWind | Push Slice | 13.4° | **262.8** | 296.7 | 40.5 | 2628/-583 | 11.8 |
| HighAltitudeFrontWind | Straight Hook | 8.9° | **232.6** | 291.1 | 18.3 | 1493/331 | -0.7 |
| HighAltitudeFrontWind | Straight Slice | 11.9° | **258.8** | 298.8 | 32.8 | 2250/-499 | -8.3 |
| HighAltitudeLeftWind | Straight | 10.4° | **258.9** | 320.3 | 23.0 | 1917/0 | 11.1 |
| HighAltitudeLeftWind | Pull Straight | 8.9° | **237.9** | 308.8 | 16.8 | 1530/0 | -12.1 |
| HighAltitudeLeftWind | Pull Hook | 7.4° | **208.1** | 293.9 | 10.9 | 1115/247 | -17.6 |
| HighAltitudeLeftWind | Pull Slice | 10.4° | **253.2** | 313.4 | 22.2 | 1871/-415 | -11.9 |
| HighAltitudeLeftWind | Push Straight | 11.9° | **274.1** | 328.3 | 29.8 | 2304/0 | 37.2 |
| HighAltitudeLeftWind | Push Hook | 10.4° | **258.1** | 322.6 | 22.4 | 1871/415 | 33.7 |
| HighAltitudeLeftWind | Push Slice | 13.4° | **276.8** | 323.8 | 35.5 | 2628/-583 | 31.4 |
| HighAltitudeLeftWind | Straight Hook | 8.9° | **236.2** | 310.1 | 16.2 | 1493/331 | 5.5 |
| HighAltitudeLeftWind | Straight Slice | 11.9° | **267.8** | 320.4 | 28.8 | 2250/-499 | 8.8 |
| HighAltitudeRightWind | Straight | 10.4° | **258.9** | 320.3 | 23.0 | 1917/0 | -11.1 |
| HighAltitudeRightWind | Pull Straight | 8.9° | **238.0** | 311.4 | 16.4 | 1530/0 | -29.1 |
| HighAltitudeRightWind | Pull Hook | 7.4° | **204.4** | 292.5 | 10.4 | 1115/247 | -29.3 |
| HighAltitudeRightWind | Pull Slice | 10.4° | **258.1** | 322.6 | 22.4 | 1871/-415 | -33.7 |
| HighAltitudeRightWind | Push Straight | 11.9° | **272.5** | 324.3 | 30.4 | 2304/0 | 10.1 |
| HighAltitudeRightWind | Push Hook | 10.4° | **253.2** | 313.4 | 22.2 | 1871/415 | 11.9 |
| HighAltitudeRightWind | Push Slice | 13.4° | **280.5** | 328.3 | 37.3 | 2628/-583 | -0.5 |
| HighAltitudeRightWind | Straight Hook | 8.9° | **232.5** | 305.4 | 15.8 | 1493/331 | -11.3 |
| HighAltitudeRightWind | Straight Slice | 11.9° | **272.9** | 328.0 | 29.6 | 2250/-499 | -18.2 |

---

## Club: 3W

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 12.3° | **228.2** | 260.3 | 38.4 | 3258/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 10.8° | **229.1** | 265.0 | 32.3 | 2889/0 | -20.0 |
| SeaLevelNoWind | Pull Hook | 9.3° | **223.5** | 265.4 | 24.9 | 2460/545 | -11.1 |
| SeaLevelNoWind | Pull Slice | 12.3° | **226.4** | 259.0 | 37.2 | 3181/-705 | -33.6 |
| SeaLevelNoWind | Push Straight | 13.8° | **224.5** | 253.9 | 43.9 | 3627/0 | 19.6 |
| SeaLevelNoWind | Push Hook | 12.3° | **226.4** | 259.0 | 37.2 | 3181/705 | 33.6 |
| SeaLevelNoWind | Push Slice | 15.3° | **218.1** | 245.6 | 47.7 | 3901/-865 | 2.5 |
| SeaLevelNoWind | Straight Hook | 10.8° | **227.0** | 263.5 | 31.2 | 2821/625 | 11.6 |
| SeaLevelNoWind | Straight Slice | 13.8° | **223.3** | 253.0 | 42.7 | 3541/-785 | -15.6 |
| SeaLevelBackWind | Straight | 12.3° | **245.3** | 290.6 | 33.5 | 3258/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 10.8° | **242.7** | 292.4 | 27.9 | 2889/0 | -19.9 |
| SeaLevelBackWind | Pull Hook | 9.3° | **232.7** | 289.3 | 21.3 | 2460/545 | -14.6 |
| SeaLevelBackWind | Pull Slice | 12.3° | **242.9** | 288.3 | 32.5 | 3181/-705 | -29.3 |
| SeaLevelBackWind | Push Straight | 13.8° | **244.3** | 286.0 | 38.8 | 3627/0 | 19.8 |
| SeaLevelBackWind | Push Hook | 12.3° | **242.9** | 288.3 | 32.5 | 3181/705 | 29.3 |
| SeaLevelBackWind | Push Slice | 15.3° | **240.2** | 279.3 | 42.6 | 3901/-865 | 7.3 |
| SeaLevelBackWind | Straight Hook | 10.8° | **240.2** | 290.5 | 27.0 | 2821/625 | 7.4 |
| SeaLevelBackWind | Straight Slice | 13.8° | **242.9** | 284.8 | 37.8 | 3541/-785 | -11.1 |
| SeaLevelFrontWind | Straight | 12.3° | **205.5** | 225.9 | 43.8 | 3258/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 10.8° | **209.9** | 233.2 | 37.3 | 2889/0 | -20.0 |
| SeaLevelFrontWind | Pull Hook | 9.3° | **208.9** | 236.9 | 29.1 | 2460/545 | -7.0 |
| SeaLevelFrontWind | Pull Slice | 12.3° | **204.8** | 226.4 | 42.5 | 3181/-705 | -38.3 |
| SeaLevelFrontWind | Push Straight | 13.8° | **199.1** | 217.6 | 49.7 | 3627/0 | 19.3 |
| SeaLevelFrontWind | Push Hook | 12.3° | **204.8** | 226.4 | 42.5 | 3181/705 | 38.3 |
| SeaLevelFrontWind | Push Slice | 15.3° | **190.6** | 207.8 | 53.5 | 3901/-865 | -3.0 |
| SeaLevelFrontWind | Straight Hook | 10.8° | **208.3** | 232.5 | 36.0 | 2821/625 | 16.2 |
| SeaLevelFrontWind | Straight Slice | 13.8° | **198.2** | 217.3 | 48.3 | 3541/-785 | -20.6 |
| SeaLevelLeftWind | Straight | 12.3° | **228.8** | 261.8 | 38.6 | 3258/0 | 18.7 |
| SeaLevelLeftWind | Pull Straight | 10.8° | **228.3** | 263.9 | 32.9 | 2889/0 | -2.8 |
| SeaLevelLeftWind | Pull Hook | 9.3° | **225.8** | 268.9 | 25.9 | 2460/545 | 4.5 |
| SeaLevelLeftWind | Pull Slice | 12.3° | **221.8** | 252.0 | 37.1 | 3181/-705 | -15.4 |
| SeaLevelLeftWind | Push Straight | 13.8° | **227.0** | 258.4 | 43.6 | 3627/0 | 39.3 |
| SeaLevelLeftWind | Push Hook | 12.3° | **232.0** | 268.7 | 37.6 | 3181/705 | 52.3 |
| SeaLevelLeftWind | Push Slice | 15.3° | **217.2** | 244.5 | 46.6 | 3901/-865 | 23.2 |
| SeaLevelLeftWind | Straight Hook | 10.8° | **230.8** | 270.1 | 32.0 | 2821/625 | 29.0 |
| SeaLevelLeftWind | Straight Slice | 13.8° | **220.2** | 248.7 | 42.1 | 3541/-785 | 4.0 |
| SeaLevelRightWind | Straight | 12.3° | **228.8** | 261.8 | 38.6 | 3258/0 | -18.7 |
| SeaLevelRightWind | Pull Straight | 10.8° | **231.0** | 268.8 | 32.1 | 2889/0 | -36.7 |
| SeaLevelRightWind | Pull Hook | 9.3° | **222.1** | 264.0 | 24.2 | 2460/545 | -25.4 |
| SeaLevelRightWind | Pull Slice | 12.3° | **232.0** | 268.7 | 37.6 | 3181/-705 | -52.3 |
| SeaLevelRightWind | Push Straight | 13.8° | **223.1** | 252.7 | 44.6 | 3627/0 | -0.7 |
| SeaLevelRightWind | Push Hook | 12.3° | **221.8** | 252.0 | 37.1 | 3181/705 | 15.4 |
| SeaLevelRightWind | Push Slice | 15.3° | **220.1** | 250.2 | 49.3 | 3901/-865 | -19.6 |
| SeaLevelRightWind | Straight Hook | 10.8° | **224.3** | 259.5 | 30.8 | 2821/625 | -4.9 |
| SeaLevelRightWind | Straight Slice | 13.8° | **227.4** | 260.4 | 43.7 | 3541/-785 | -36.1 |
| HighAltitudeNoWind | Straight | 12.3° | **257.2** | 302.5 | 31.9 | 3258/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 10.8° | **250.6** | 302.1 | 25.7 | 2889/0 | -21.8 |
| HighAltitudeNoWind | Pull Hook | 9.3° | **234.9** | 295.4 | 18.9 | 2460/545 | -18.6 |
| HighAltitudeNoWind | Pull Slice | 12.3° | **254.5** | 300.6 | 30.8 | 3181/-705 | -30.4 |
| HighAltitudeNoWind | Push Straight | 13.8° | **259.5** | 300.0 | 37.9 | 3627/0 | 22.6 |
| HighAltitudeNoWind | Push Hook | 12.3° | **254.5** | 300.6 | 30.8 | 3181/705 | 30.4 |
| HighAltitudeNoWind | Push Slice | 15.3° | **256.7** | 293.9 | 42.5 | 3901/-865 | 9.7 |
| HighAltitudeNoWind | Straight Hook | 10.8° | **247.3** | 299.8 | 24.8 | 2821/625 | 5.2 |
| HighAltitudeNoWind | Straight Slice | 13.8° | **257.0** | 298.2 | 36.8 | 3541/-785 | -10.7 |
| HighAltitudeBackWind | Straight | 12.3° | **264.8** | 324.1 | 27.8 | 3258/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 10.8° | **254.5** | 320.4 | 22.2 | 2889/0 | -21.3 |
| HighAltitudeBackWind | Pull Hook | 9.3° | **234.8** | 310.2 | 16.2 | 2460/545 | -20.9 |
| HighAltitudeBackWind | Pull Slice | 12.3° | **261.5** | 321.4 | 26.9 | 3181/-705 | -25.7 |
| HighAltitudeBackWind | Push Straight | 13.8° | **270.6** | 324.6 | 33.3 | 3627/0 | 22.4 |
| HighAltitudeBackWind | Push Hook | 12.3° | **261.5** | 321.4 | 26.9 | 3181/705 | 25.7 |
| HighAltitudeBackWind | Push Slice | 15.3° | **270.8** | 320.9 | 37.8 | 3901/-865 | 14.4 |
| HighAltitudeBackWind | Straight Hook | 10.8° | **251.1** | 317.9 | 21.5 | 2821/625 | 1.5 |
| HighAltitudeBackWind | Straight Slice | 13.8° | **267.9** | 322.5 | 32.4 | 3541/-785 | -6.2 |
| HighAltitudeFrontWind | Straight | 12.3° | **244.0** | 275.8 | 36.7 | 3258/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 10.8° | **241.7** | 278.9 | 29.9 | 2889/0 | -22.3 |
| HighAltitudeFrontWind | Pull Hook | 9.3° | **230.9** | 276.5 | 22.1 | 2460/545 | -15.7 |
| HighAltitudeFrontWind | Pull Slice | 12.3° | **242.2** | 275.1 | 35.4 | 3181/-705 | -35.5 |
| HighAltitudeFrontWind | Push Straight | 13.8° | **242.8** | 270.8 | 43.2 | 3627/0 | 22.8 |
| HighAltitudeFrontWind | Push Hook | 12.3° | **242.2** | 275.1 | 35.4 | 3181/705 | 35.5 |
| HighAltitudeFrontWind | Push Slice | 15.3° | **237.2** | 262.7 | 48.0 | 3901/-865 | 4.4 |
| HighAltitudeFrontWind | Straight Hook | 10.8° | **238.9** | 277.2 | 28.8 | 2821/625 | 9.5 |
| HighAltitudeFrontWind | Straight Slice | 13.8° | **241.0** | 269.7 | 41.9 | 3541/-785 | -15.9 |
| HighAltitudeLeftWind | Straight | 12.3° | **257.7** | 303.4 | 32.0 | 3258/0 | 14.5 |
| HighAltitudeLeftWind | Pull Straight | 10.8° | **250.6** | 301.1 | 26.2 | 2889/0 | -9.1 |
| HighAltitudeLeftWind | Pull Hook | 9.3° | **237.6** | 298.2 | 19.6 | 2460/545 | -7.8 |
| HighAltitudeLeftWind | Pull Slice | 12.3° | **250.9** | 294.6 | 30.8 | 3181/-705 | -16.3 |
| HighAltitudeLeftWind | Push Straight | 13.8° | **261.1** | 303.3 | 37.6 | 3627/0 | 38.5 |
| HighAltitudeLeftWind | Push Hook | 12.3° | **258.8** | 308.1 | 31.1 | 3181/705 | 44.9 |
| HighAltitudeLeftWind | Push Slice | 15.3° | **254.9** | 292.0 | 41.5 | 3901/-865 | 26.8 |
| HighAltitudeLeftWind | Straight Hook | 10.8° | **250.7** | 304.8 | 25.3 | 2821/625 | 18.1 |
| HighAltitudeLeftWind | Straight Slice | 13.8° | **254.3** | 294.2 | 36.4 | 3541/-785 | 5.0 |
| HighAltitudeRightWind | Straight | 12.3° | **257.7** | 303.4 | 32.0 | 3258/0 | -14.5 |
| HighAltitudeRightWind | Pull Straight | 10.8° | **251.6** | 304.6 | 25.5 | 2889/0 | -34.3 |
| HighAltitudeRightWind | Pull Hook | 9.3° | **232.9** | 293.9 | 18.4 | 2460/545 | -28.5 |
| HighAltitudeRightWind | Pull Slice | 12.3° | **258.8** | 308.1 | 31.1 | 3181/-705 | -44.9 |
| HighAltitudeRightWind | Push Straight | 13.8° | **258.8** | 298.7 | 38.5 | 3627/0 | 6.3 |
| HighAltitudeRightWind | Push Hook | 12.3° | **250.9** | 294.6 | 30.8 | 3181/705 | 16.3 |
| HighAltitudeRightWind | Push Slice | 15.3° | **259.1** | 297.8 | 43.9 | 3901/-865 | -8.8 |
| HighAltitudeRightWind | Straight Hook | 10.8° | **245.1** | 296.5 | 24.5 | 2821/625 | -7.0 |
| HighAltitudeRightWind | Straight Slice | 13.8° | **260.8** | 304.3 | 37.6 | 3541/-785 | -27.4 |

---

## Club: 4i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 16.6° | **192.1** | 218.5 | 41.1 | 4320/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 15.1° | **196.2** | 224.7 | 37.3 | 3981/0 | -17.1 |
| SeaLevelNoWind | Pull Hook | 13.6° | **197.7** | 229.3 | 32.2 | 3556/788 | -6.3 |
| SeaLevelNoWind | Pull Slice | 16.6° | **191.3** | 218.0 | 40.2 | 4218/-935 | -29.1 |
| SeaLevelNoWind | Push Straight | 18.1° | **187.3** | 211.8 | 44.6 | 4660/0 | 16.3 |
| SeaLevelNoWind | Push Hook | 16.6° | **191.3** | 218.0 | 40.2 | 4218/935 | 29.1 |
| SeaLevelNoWind | Push Slice | 19.6° | **181.4** | 204.5 | 46.9 | 4881/-1082 | 3.1 |
| SeaLevelNoWind | Straight Hook | 15.1° | **195.1** | 224.0 | 36.4 | 3887/862 | 11.9 |
| SeaLevelNoWind | Straight Slice | 18.1° | **186.6** | 211.3 | 43.7 | 4549/-1009 | -12.7 |
| SeaLevelBackWind | Straight | 16.6° | **209.4** | 247.7 | 36.0 | 4320/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 15.1° | **211.6** | 252.5 | 32.5 | 3981/0 | -17.2 |
| SeaLevelBackWind | Pull Hook | 13.6° | **210.6** | 255.4 | 27.8 | 3556/788 | -10.5 |
| SeaLevelBackWind | Pull Slice | 16.6° | **208.0** | 246.2 | 35.2 | 4218/-935 | -24.9 |
| SeaLevelBackWind | Push Straight | 18.1° | **206.1** | 242.1 | 39.4 | 4660/0 | 16.6 |
| SeaLevelBackWind | Push Hook | 16.6° | **208.0** | 246.2 | 35.2 | 4218/935 | 24.9 |
| SeaLevelBackWind | Push Slice | 19.6° | **201.7** | 235.9 | 41.8 | 4881/-1082 | 7.7 |
| SeaLevelBackWind | Straight Hook | 15.1° | **210.1** | 251.4 | 31.7 | 3887/862 | 7.6 |
| SeaLevelBackWind | Straight Slice | 18.1° | **205.3** | 241.4 | 38.6 | 4549/-1009 | -8.4 |
| SeaLevelFrontWind | Straight | 16.6° | **168.5** | 184.2 | 46.6 | 4320/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 15.1° | **174.5** | 191.9 | 42.5 | 3981/0 | -16.9 |
| SeaLevelFrontWind | Pull Hook | 13.6° | **178.4** | 198.3 | 36.9 | 3556/788 | -1.6 |
| SeaLevelFrontWind | Pull Slice | 16.6° | **168.5** | 185.1 | 45.5 | 4218/-935 | -33.6 |
| SeaLevelFrontWind | Push Straight | 18.1° | **162.3** | 176.6 | 50.2 | 4660/0 | 16.0 |
| SeaLevelFrontWind | Push Hook | 16.6° | **168.5** | 185.1 | 45.5 | 4218/935 | 33.6 |
| SeaLevelFrontWind | Push Slice | 19.6° | **155.2** | 168.7 | 52.3 | 4881/-1082 | -2.0 |
| SeaLevelFrontWind | Straight Hook | 15.1° | **173.7** | 191.8 | 41.4 | 3887/862 | 16.6 |
| SeaLevelFrontWind | Straight Slice | 18.1° | **161.9** | 176.7 | 49.1 | 4549/-1009 | -17.5 |
| SeaLevelLeftWind | Straight | 16.6° | **192.6** | 220.1 | 41.3 | 4320/0 | 17.9 |
| SeaLevelLeftWind | Pull Straight | 15.1° | **194.9** | 223.5 | 37.9 | 3981/0 | 0.2 |
| SeaLevelLeftWind | Pull Hook | 13.6° | **199.8** | 233.2 | 33.4 | 3556/788 | 10.7 |
| SeaLevelLeftWind | Pull Slice | 16.6° | **186.6** | 211.3 | 40.1 | 4218/-935 | -11.5 |
| SeaLevelLeftWind | Push Straight | 18.1° | **189.5** | 216.2 | 44.3 | 4660/0 | 34.8 |
| SeaLevelLeftWind | Push Hook | 16.6° | **196.6** | 227.2 | 40.7 | 4218/935 | 47.2 |
| SeaLevelLeftWind | Push Slice | 19.6° | **180.9** | 204.1 | 45.7 | 4881/-1082 | 22.1 |
| SeaLevelLeftWind | Straight Hook | 15.1° | **198.7** | 230.5 | 37.2 | 3887/862 | 29.5 |
| SeaLevelLeftWind | Straight Slice | 18.1° | **184.0** | 207.9 | 43.1 | 4549/-1009 | 5.6 |
| SeaLevelRightWind | Straight | 16.6° | **192.6** | 220.1 | 41.3 | 4320/0 | -17.9 |
| SeaLevelRightWind | Pull Straight | 15.1° | **198.2** | 228.7 | 37.1 | 3981/0 | -33.9 |
| SeaLevelRightWind | Pull Hook | 13.6° | **196.4** | 227.9 | 31.3 | 3556/788 | -21.9 |
| SeaLevelRightWind | Pull Slice | 16.6° | **196.6** | 227.2 | 40.7 | 4218/-935 | -47.2 |
| SeaLevelRightWind | Push Straight | 18.1° | **185.6** | 210.5 | 45.3 | 4660/0 | -2.6 |
| SeaLevelRightWind | Push Hook | 16.6° | **186.6** | 211.3 | 40.1 | 4218/935 | 11.5 |
| SeaLevelRightWind | Push Slice | 19.6° | **182.9** | 208.4 | 48.3 | 4881/-1082 | -17.2 |
| SeaLevelRightWind | Straight Hook | 15.1° | **192.3** | 220.1 | 35.8 | 3887/862 | -4.7 |
| SeaLevelRightWind | Straight Slice | 18.1° | **190.1** | 218.0 | 44.7 | 4549/-1009 | -31.9 |
| HighAltitudeNoWind | Straight | 16.6° | **223.0** | 259.2 | 36.5 | 4320/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 15.1° | **223.5** | 263.2 | 32.1 | 3981/0 | -19.5 |
| HighAltitudeNoWind | Pull Hook | 13.6° | **219.4** | 264.2 | 26.7 | 3556/788 | -13.2 |
| HighAltitudeNoWind | Pull Slice | 16.6° | **221.4** | 258.0 | 35.6 | 4218/-935 | -28.1 |
| HighAltitudeNoWind | Push Straight | 18.1° | **220.7** | 254.1 | 40.7 | 4660/0 | 19.2 |
| HighAltitudeNoWind | Push Hook | 16.6° | **221.4** | 258.0 | 35.6 | 4218/935 | 28.1 |
| HighAltitudeNoWind | Push Slice | 19.6° | **216.2** | 247.4 | 43.6 | 4881/-1082 | 8.6 |
| HighAltitudeNoWind | Straight Hook | 15.1° | **221.5** | 261.8 | 31.3 | 3887/862 | 7.6 |
| HighAltitudeNoWind | Straight Slice | 18.1° | **219.4** | 253.2 | 39.8 | 4549/-1009 | -9.7 |
| HighAltitudeBackWind | Straight | 16.6° | **232.4** | 281.5 | 32.0 | 4320/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 15.1° | **230.3** | 283.4 | 28.0 | 3981/0 | -19.1 |
| HighAltitudeBackWind | Pull Hook | 13.6° | **223.8** | 282.3 | 23.2 | 3556/788 | -16.6 |
| HighAltitudeBackWind | Pull Slice | 16.6° | **230.3** | 279.6 | 31.3 | 4218/-935 | -23.4 |
| HighAltitudeBackWind | Push Straight | 18.1° | **232.2** | 277.8 | 35.9 | 4660/0 | 19.1 |
| HighAltitudeBackWind | Push Hook | 16.6° | **230.3** | 279.6 | 31.3 | 4218/935 | 23.4 |
| HighAltitudeBackWind | Push Slice | 19.6° | **229.8** | 272.6 | 38.9 | 4881/-1082 | 13.1 |
| HighAltitudeBackWind | Straight Hook | 15.1° | **228.3** | 281.9 | 27.3 | 3887/862 | 3.3 |
| HighAltitudeBackWind | Straight Slice | 18.1° | **230.8** | 276.7 | 35.2 | 4549/-1009 | -5.2 |
| HighAltitudeFrontWind | Straight | 16.6° | **207.1** | 231.5 | 41.6 | 4320/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 15.1° | **210.1** | 237.4 | 36.8 | 3981/0 | -19.7 |
| HighAltitudeFrontWind | Pull Hook | 13.6° | **209.0** | 240.5 | 30.7 | 3556/788 | -9.2 |
| HighAltitudeFrontWind | Pull Slice | 16.6° | **206.2** | 231.6 | 40.5 | 4218/-935 | -33.0 |
| HighAltitudeFrontWind | Push Straight | 18.1° | **202.8** | 224.9 | 45.9 | 4660/0 | 19.2 |
| HighAltitudeFrontWind | Push Hook | 16.6° | **206.2** | 231.6 | 40.5 | 4218/935 | 33.0 |
| HighAltitudeFrontWind | Push Slice | 19.6° | **196.6** | 217.0 | 48.9 | 4881/-1082 | 3.5 |
| HighAltitudeFrontWind | Straight Hook | 15.1° | **208.4** | 236.5 | 35.7 | 3887/862 | 12.2 |
| HighAltitudeFrontWind | Straight Slice | 18.1° | **201.8** | 224.5 | 44.9 | 4549/-1009 | -14.7 |
| HighAltitudeLeftWind | Straight | 16.6° | **223.3** | 260.1 | 36.7 | 4320/0 | 14.6 |
| HighAltitudeLeftWind | Pull Straight | 15.1° | **223.0** | 262.0 | 32.7 | 3981/0 | -5.8 |
| HighAltitudeLeftWind | Pull Hook | 13.6° | **222.0** | 267.5 | 27.7 | 3556/788 | -0.2 |
| HighAltitudeLeftWind | Pull Slice | 16.6° | **217.5** | 252.0 | 35.6 | 4218/-935 | -13.8 |
| HighAltitudeLeftWind | Push Straight | 18.1° | **222.3** | 257.3 | 40.4 | 4660/0 | 34.5 |
| HighAltitudeLeftWind | Push Hook | 16.6° | **225.7** | 265.6 | 36.0 | 4218/935 | 42.8 |
| HighAltitudeLeftWind | Push Slice | 19.6° | **214.9** | 246.2 | 42.7 | 4881/-1082 | 24.5 |
| HighAltitudeLeftWind | Straight Hook | 15.1° | **224.8** | 267.2 | 32.0 | 3887/862 | 21.6 |
| HighAltitudeLeftWind | Straight Slice | 18.1° | **216.6** | 249.3 | 39.3 | 4549/-1009 | 5.4 |
| HighAltitudeRightWind | Straight | 16.6° | **223.3** | 260.1 | 36.7 | 4320/0 | -14.6 |
| HighAltitudeRightWind | Pull Straight | 15.1° | **224.7** | 266.0 | 31.9 | 3981/0 | -32.8 |
| HighAltitudeRightWind | Pull Hook | 13.6° | **217.6** | 262.4 | 26.1 | 3556/788 | -25.0 |
| HighAltitudeRightWind | Pull Slice | 16.6° | **225.7** | 265.6 | 36.0 | 4218/-935 | -42.8 |
| HighAltitudeRightWind | Push Straight | 18.1° | **219.8** | 252.8 | 41.3 | 4660/0 | 3.5 |
| HighAltitudeRightWind | Push Hook | 16.6° | **217.5** | 252.0 | 35.6 | 4218/935 | 13.8 |
| HighAltitudeRightWind | Push Slice | 19.6° | **218.3** | 251.0 | 45.0 | 4881/-1082 | -8.8 |
| HighAltitudeRightWind | Straight Hook | 15.1° | **218.8** | 258.0 | 30.9 | 3887/862 | -5.6 |
| HighAltitudeRightWind | Straight Slice | 18.1° | **222.9** | 258.9 | 40.6 | 4549/-1009 | -25.8 |

---

## Club: 5i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 18.9° | **175.5** | 199.5 | 41.3 | 4846/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 17.4° | **179.9** | 205.7 | 38.2 | 4514/0 | -15.7 |
| SeaLevelNoWind | Pull Hook | 15.9° | **182.6** | 210.8 | 34.0 | 4083/905 | -5.5 |
| SeaLevelNoWind | Pull Slice | 18.9° | **175.0** | 199.1 | 40.5 | 4731/-1049 | -26.1 |
| SeaLevelNoWind | Push Straight | 20.4° | **170.7** | 192.9 | 44.1 | 5178/0 | 14.9 |
| SeaLevelNoWind | Push Hook | 18.9° | **175.0** | 199.1 | 40.5 | 4731/1049 | 26.1 |
| SeaLevelNoWind | Push Slice | 21.9° | **165.5** | 186.3 | 45.9 | 5379/-1193 | 3.8 |
| SeaLevelNoWind | Straight Hook | 17.4° | **179.1** | 205.2 | 37.4 | 4407/977 | 10.8 |
| SeaLevelNoWind | Straight Slice | 20.4° | **170.3** | 192.8 | 43.3 | 5055/-1121 | -10.9 |
| SeaLevelBackWind | Straight | 18.9° | **192.4** | 227.8 | 36.2 | 4846/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 17.4° | **195.3** | 232.9 | 33.3 | 4514/0 | -15.8 |
| SeaLevelBackWind | Pull Hook | 15.9° | **196.0** | 236.8 | 29.5 | 4083/905 | -9.7 |
| SeaLevelBackWind | Pull Slice | 18.9° | **191.4** | 226.9 | 35.5 | 4731/-1049 | -22.1 |
| SeaLevelBackWind | Push Straight | 20.4° | **188.9** | 222.3 | 38.9 | 5178/0 | 15.1 |
| SeaLevelBackWind | Push Hook | 18.9° | **191.4** | 226.9 | 35.5 | 4731/1049 | 22.1 |
| SeaLevelBackWind | Push Slice | 21.9° | **184.7** | 216.5 | 40.9 | 5379/-1193 | 8.1 |
| SeaLevelBackWind | Straight Hook | 17.4° | **194.3** | 232.2 | 32.6 | 4407/977 | 6.6 |
| SeaLevelBackWind | Straight Slice | 20.4° | **188.3** | 221.8 | 38.3 | 5055/-1121 | -6.7 |
| SeaLevelFrontWind | Straight | 18.9° | **152.5** | 166.3 | 46.8 | 4846/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 17.4° | **158.4** | 173.5 | 43.6 | 4514/0 | -15.5 |
| SeaLevelFrontWind | Pull Hook | 15.9° | **162.8** | 180.0 | 38.9 | 4083/905 | -0.8 |
| SeaLevelFrontWind | Pull Slice | 18.9° | **152.6** | 167.2 | 45.8 | 4731/-1049 | -30.6 |
| SeaLevelFrontWind | Push Straight | 20.4° | **146.6** | 159.2 | 49.6 | 5178/0 | 14.6 |
| SeaLevelFrontWind | Push Hook | 18.9° | **152.6** | 167.2 | 45.8 | 4731/1049 | 30.6 |
| SeaLevelFrontWind | Push Slice | 21.9° | **140.2** | 152.1 | 51.2 | 5379/-1193 | -1.2 |
| SeaLevelFrontWind | Straight Hook | 17.4° | **157.8** | 173.5 | 42.6 | 4407/977 | 15.5 |
| SeaLevelFrontWind | Straight Slice | 20.4° | **146.3** | 159.5 | 48.7 | 5055/-1121 | -15.6 |
| SeaLevelLeftWind | Straight | 18.9° | **175.9** | 201.1 | 41.5 | 4846/0 | 17.3 |
| SeaLevelLeftWind | Pull Straight | 17.4° | **178.6** | 204.5 | 38.9 | 4514/0 | 1.2 |
| SeaLevelLeftWind | Pull Hook | 15.9° | **184.7** | 214.8 | 35.3 | 4083/905 | 11.4 |
| SeaLevelLeftWind | Pull Slice | 18.9° | **170.7** | 193.1 | 40.3 | 4731/-1049 | -9.1 |
| SeaLevelLeftWind | Push Straight | 20.4° | **172.8** | 197.2 | 43.8 | 5178/0 | 32.5 |
| SeaLevelLeftWind | Push Hook | 18.9° | **179.9** | 207.9 | 41.0 | 4731/1049 | 43.6 |
| SeaLevelLeftWind | Push Slice | 21.9° | **165.1** | 186.4 | 44.8 | 5379/-1193 | 21.9 |
| SeaLevelLeftWind | Straight Hook | 17.4° | **182.6** | 211.6 | 38.3 | 4407/977 | 28.1 |
| SeaLevelLeftWind | Straight Slice | 20.4° | **167.9** | 189.7 | 42.7 | 5055/-1121 | 6.7 |
| SeaLevelRightWind | Straight | 18.9° | **175.9** | 201.1 | 41.5 | 4846/0 | -17.3 |
| SeaLevelRightWind | Pull Straight | 17.4° | **181.8** | 209.6 | 38.0 | 4514/0 | -32.1 |
| SeaLevelRightWind | Pull Hook | 15.9° | **181.4** | 209.7 | 33.1 | 4083/905 | -21.0 |
| SeaLevelRightWind | Pull Slice | 18.9° | **179.9** | 207.9 | 41.0 | 4731/-1049 | -43.6 |
| SeaLevelRightWind | Push Straight | 20.4° | **169.2** | 191.9 | 44.7 | 5178/0 | -3.3 |
| SeaLevelRightWind | Push Hook | 18.9° | **170.7** | 193.1 | 40.3 | 4731/1049 | 9.1 |
| SeaLevelRightWind | Push Slice | 21.9° | **166.5** | 189.7 | 47.3 | 5379/-1193 | -15.7 |
| SeaLevelRightWind | Straight Hook | 17.4° | **176.4** | 201.6 | 36.9 | 4407/977 | -5.5 |
| SeaLevelRightWind | Straight Slice | 20.4° | **173.5** | 199.0 | 44.3 | 5055/-1121 | -29.3 |
| HighAltitudeNoWind | Straight | 18.9° | **205.4** | 238.2 | 37.7 | 4846/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 17.4° | **207.4** | 243.0 | 34.0 | 4514/0 | -18.1 |
| HighAltitudeNoWind | Pull Hook | 15.9° | **206.1** | 245.6 | 29.4 | 4083/905 | -11.7 |
| HighAltitudeNoWind | Pull Slice | 18.9° | **204.3** | 237.5 | 36.9 | 4731/-1049 | -25.8 |
| HighAltitudeNoWind | Push Straight | 20.4° | **202.4** | 232.8 | 41.1 | 5178/0 | 17.6 |
| HighAltitudeNoWind | Push Hook | 18.9° | **204.3** | 237.5 | 36.9 | 4731/1049 | 25.8 |
| HighAltitudeNoWind | Push Slice | 21.9° | **197.9** | 226.4 | 43.5 | 5379/-1193 | 8.6 |
| HighAltitudeNoWind | Straight Hook | 17.4° | **206.0** | 242.0 | 33.2 | 4407/977 | 7.3 |
| HighAltitudeNoWind | Straight Slice | 20.4° | **201.4** | 232.1 | 40.3 | 5055/-1121 | -8.4 |
| HighAltitudeBackWind | Straight | 18.9° | **215.3** | 260.2 | 33.1 | 4846/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 17.4° | **215.2** | 263.4 | 29.7 | 4514/0 | -17.8 |
| HighAltitudeBackWind | Pull Hook | 15.9° | **212.0** | 264.6 | 25.6 | 4083/905 | -15.3 |
| HighAltitudeBackWind | Pull Slice | 18.9° | **213.6** | 258.7 | 32.5 | 4731/-1049 | -21.2 |
| HighAltitudeBackWind | Push Straight | 20.4° | **213.9** | 255.9 | 36.3 | 5178/0 | 17.5 |
| HighAltitudeBackWind | Push Hook | 18.9° | **213.6** | 258.7 | 32.5 | 4731/1049 | 21.2 |
| HighAltitudeBackWind | Push Slice | 21.9° | **211.2** | 250.9 | 38.9 | 5379/-1193 | 12.9 |
| HighAltitudeBackWind | Straight Hook | 17.4° | **213.6** | 262.3 | 29.1 | 4407/977 | 3.1 |
| HighAltitudeBackWind | Straight Slice | 20.4° | **212.8** | 255.1 | 35.7 | 5055/-1121 | -4.1 |
| HighAltitudeFrontWind | Straight | 18.9° | **189.6** | 211.0 | 42.8 | 4846/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 17.4° | **193.4** | 217.3 | 38.9 | 4514/0 | -18.2 |
| HighAltitudeFrontWind | Pull Hook | 15.9° | **194.5** | 221.7 | 33.6 | 4083/905 | -7.4 |
| HighAltitudeFrontWind | Pull Slice | 18.9° | **189.0** | 211.3 | 41.8 | 4731/-1049 | -30.7 |
| HighAltitudeFrontWind | Push Straight | 20.4° | **184.8** | 204.3 | 46.4 | 5178/0 | 17.6 |
| HighAltitudeFrontWind | Push Hook | 18.9° | **189.0** | 211.3 | 41.8 | 4731/1049 | 30.7 |
| HighAltitudeFrontWind | Push Slice | 21.9° | **178.8** | 196.7 | 48.7 | 5379/-1193 | 3.6 |
| HighAltitudeFrontWind | Straight Hook | 17.4° | **192.3** | 216.8 | 37.9 | 4407/977 | 12.1 |
| HighAltitudeFrontWind | Straight Slice | 20.4° | **184.2** | 204.1 | 45.4 | 5055/-1121 | -13.4 |
| HighAltitudeLeftWind | Straight | 18.9° | **205.7** | 239.1 | 37.9 | 4846/0 | 14.2 |
| HighAltitudeLeftWind | Pull Straight | 17.4° | **206.7** | 241.8 | 34.6 | 4514/0 | -4.5 |
| HighAltitudeLeftWind | Pull Hook | 15.9° | **208.6** | 248.9 | 30.4 | 4083/905 | 1.7 |
| HighAltitudeLeftWind | Pull Slice | 18.9° | **200.6** | 231.7 | 36.8 | 4731/-1049 | -11.9 |
| HighAltitudeLeftWind | Push Straight | 20.4° | **204.1** | 236.1 | 40.8 | 5178/0 | 32.4 |
| HighAltitudeLeftWind | Push Hook | 18.9° | **208.5** | 244.8 | 37.3 | 4731/1049 | 40.2 |
| HighAltitudeLeftWind | Push Slice | 21.9° | **196.8** | 225.4 | 42.6 | 5379/-1193 | 23.9 |
| HighAltitudeLeftWind | Straight Hook | 17.4° | **209.2** | 247.2 | 34.0 | 4407/977 | 21.3 |
| HighAltitudeLeftWind | Straight Slice | 20.4° | **198.9** | 228.7 | 39.8 | 5055/-1121 | 6.2 |
| HighAltitudeRightWind | Straight | 18.9° | **205.7** | 239.1 | 37.9 | 4846/0 | -14.2 |
| HighAltitudeRightWind | Pull Straight | 17.4° | **208.6** | 245.7 | 33.8 | 4514/0 | -31.2 |
| HighAltitudeRightWind | Pull Hook | 15.9° | **204.4** | 244.0 | 28.7 | 4083/905 | -23.7 |
| HighAltitudeRightWind | Pull Slice | 18.9° | **208.5** | 244.8 | 37.3 | 4731/-1049 | -40.2 |
| HighAltitudeRightWind | Push Straight | 20.4° | **201.5** | 231.6 | 41.7 | 5178/0 | 2.5 |
| HighAltitudeRightWind | Push Hook | 18.9° | **200.6** | 231.7 | 36.8 | 4731/1049 | 11.9 |
| HighAltitudeRightWind | Push Slice | 21.9° | **199.6** | 229.5 | 44.9 | 5379/-1193 | -8.1 |
| HighAltitudeRightWind | Straight Hook | 17.4° | **203.3** | 238.3 | 32.8 | 4407/977 | -5.7 |
| HighAltitudeRightWind | Straight Slice | 20.4° | **204.8** | 237.7 | 41.2 | 5055/-1121 | -24.1 |

---

## Club: 6i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 21.2° | **161.1** | 182.8 | 41.1 | 5344/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 19.7° | **165.4** | 188.8 | 38.6 | 5020/0 | -14.4 |
| SeaLevelNoWind | Pull Hook | 18.2° | **168.7** | 194.3 | 35.1 | 4584/1016 | -5.3 |
| SeaLevelNoWind | Pull Slice | 21.2° | **160.8** | 182.7 | 40.4 | 5218/-1157 | -23.3 |
| SeaLevelNoWind | Push Straight | 22.7° | **156.4** | 176.6 | 43.4 | 5669/0 | 13.6 |
| SeaLevelNoWind | Push Hook | 21.2° | **160.8** | 182.7 | 40.4 | 5218/1157 | 23.3 |
| SeaLevelNoWind | Push Slice | 24.2° | **151.7** | 170.5 | 44.9 | 5851/-1297 | 4.4 |
| SeaLevelNoWind | Straight Hook | 19.7° | **164.8** | 188.4 | 37.9 | 4901/1086 | 9.5 |
| SeaLevelNoWind | Straight Slice | 22.7° | **156.3** | 176.6 | 42.8 | 5534/-1227 | -9.2 |
| SeaLevelBackWind | Straight | 21.2° | **177.4** | 210.3 | 36.2 | 5344/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 19.7° | **180.4** | 215.3 | 33.8 | 5020/0 | -14.5 |
| SeaLevelBackWind | Pull Hook | 18.2° | **182.3** | 219.7 | 30.6 | 4584/1016 | -9.5 |
| SeaLevelBackWind | Pull Slice | 21.2° | **176.7** | 209.6 | 35.6 | 5218/-1157 | -19.5 |
| SeaLevelBackWind | Push Straight | 22.7° | **174.0** | 205.0 | 38.5 | 5669/0 | 13.9 |
| SeaLevelBackWind | Push Hook | 21.2° | **176.7** | 209.6 | 35.6 | 5218/1157 | 19.5 |
| SeaLevelBackWind | Push Slice | 24.2° | **170.2** | 199.6 | 40.2 | 5851/-1297 | 8.5 |
| SeaLevelBackWind | Straight Hook | 19.7° | **179.8** | 214.8 | 33.2 | 4901/1086 | 5.4 |
| SeaLevelBackWind | Straight Slice | 22.7° | **173.7** | 204.8 | 37.9 | 5534/-1227 | -5.2 |
| SeaLevelFrontWind | Straight | 21.2° | **138.6** | 150.7 | 46.6 | 5344/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 19.7° | **144.1** | 157.3 | 44.0 | 5020/0 | -14.2 |
| SeaLevelFrontWind | Pull Hook | 18.2° | **148.7** | 163.5 | 40.1 | 4584/1016 | -0.6 |
| SeaLevelFrontWind | Pull Slice | 21.2° | **138.8** | 151.7 | 45.8 | 5218/-1157 | -27.6 |
| SeaLevelFrontWind | Push Straight | 22.7° | **133.2** | 144.3 | 48.9 | 5669/0 | 13.4 |
| SeaLevelFrontWind | Push Hook | 21.2° | **138.8** | 151.7 | 45.8 | 5218/1157 | 27.6 |
| SeaLevelFrontWind | Push Slice | 24.2° | **127.5** | 137.8 | 50.1 | 5851/-1297 | -0.4 |
| SeaLevelFrontWind | Straight Hook | 19.7° | **143.8** | 157.5 | 43.1 | 4901/1086 | 14.0 |
| SeaLevelFrontWind | Straight Slice | 22.7° | **133.1** | 144.6 | 48.1 | 5534/-1227 | -13.7 |
| SeaLevelLeftWind | Straight | 21.2° | **161.4** | 184.3 | 41.3 | 5344/0 | 16.7 |
| SeaLevelLeftWind | Pull Straight | 19.7° | **164.1** | 187.7 | 39.3 | 5020/0 | 2.0 |
| SeaLevelLeftWind | Pull Hook | 18.2° | **170.4** | 197.8 | 36.4 | 4584/1016 | 11.3 |
| SeaLevelLeftWind | Pull Slice | 21.2° | **156.7** | 177.0 | 40.3 | 5218/-1157 | -6.8 |
| SeaLevelLeftWind | Push Straight | 22.7° | **158.5** | 180.8 | 43.2 | 5669/0 | 30.6 |
| SeaLevelLeftWind | Push Hook | 21.2° | **165.4** | 191.0 | 41.0 | 5218/1157 | 40.2 |
| SeaLevelLeftWind | Push Slice | 24.2° | **151.5** | 171.0 | 43.9 | 5851/-1297 | 21.8 |
| SeaLevelLeftWind | Straight Hook | 19.7° | **168.0** | 194.5 | 38.8 | 4901/1086 | 26.2 |
| SeaLevelLeftWind | Straight Slice | 22.7° | **154.1** | 173.9 | 42.2 | 5534/-1227 | 7.8 |
| SeaLevelRightWind | Straight | 21.2° | **161.4** | 184.3 | 41.3 | 5344/0 | -16.7 |
| SeaLevelRightWind | Pull Straight | 19.7° | **167.3** | 192.7 | 38.4 | 5020/0 | -30.3 |
| SeaLevelRightWind | Pull Hook | 18.2° | **167.6** | 193.2 | 34.2 | 4584/1016 | -20.5 |
| SeaLevelRightWind | Pull Slice | 21.2° | **165.4** | 191.0 | 41.0 | 5218/-1157 | -40.2 |
| SeaLevelRightWind | Push Straight | 22.7° | **155.0** | 175.6 | 44.1 | 5669/0 | -3.9 |
| SeaLevelRightWind | Push Hook | 21.2° | **156.7** | 177.0 | 40.3 | 5218/1157 | 6.8 |
| SeaLevelRightWind | Push Slice | 24.2° | **152.6** | 173.7 | 46.4 | 5851/-1297 | -14.4 |
| SeaLevelRightWind | Straight Hook | 19.7° | **162.5** | 185.4 | 37.4 | 4901/1086 | -6.4 |
| SeaLevelRightWind | Straight Slice | 22.7° | **159.1** | 182.4 | 43.8 | 5534/-1227 | -26.9 |
| HighAltitudeNoWind | Straight | 21.2° | **189.7** | 219.6 | 38.4 | 5344/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 19.7° | **192.5** | 224.8 | 35.3 | 5020/0 | -16.8 |
| HighAltitudeNoWind | Pull Hook | 18.2° | **192.9** | 228.3 | 31.3 | 4584/1016 | -10.7 |
| HighAltitudeNoWind | Pull Slice | 21.2° | **188.9** | 219.0 | 37.7 | 5218/-1157 | -23.4 |
| HighAltitudeNoWind | Push Straight | 22.7° | **186.3** | 214.0 | 41.3 | 5669/0 | 16.2 |
| HighAltitudeNoWind | Push Hook | 21.2° | **188.9** | 219.0 | 37.7 | 5218/1157 | 23.4 |
| HighAltitudeNoWind | Push Slice | 24.2° | **182.0** | 207.9 | 43.3 | 5851/-1297 | 8.7 |
| HighAltitudeNoWind | Straight Hook | 19.7° | **191.4** | 224.0 | 34.6 | 4901/1086 | 6.7 |
| HighAltitudeNoWind | Straight Slice | 22.7° | **185.8** | 213.7 | 40.6 | 5534/-1227 | -7.2 |
| HighAltitudeBackWind | Straight | 21.2° | **199.8** | 241.1 | 33.8 | 5344/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 19.7° | **200.7** | 244.8 | 31.0 | 5020/0 | -16.5 |
| HighAltitudeBackWind | Pull Hook | 18.2° | **199.6** | 247.4 | 27.5 | 4584/1016 | -14.4 |
| HighAltitudeBackWind | Pull Slice | 21.2° | **198.6** | 240.0 | 33.3 | 5218/-1157 | -19.1 |
| HighAltitudeBackWind | Push Straight | 22.7° | **197.8** | 236.6 | 36.6 | 5669/0 | 16.2 |
| HighAltitudeBackWind | Push Hook | 21.2° | **198.6** | 240.0 | 33.3 | 5218/1157 | 19.1 |
| HighAltitudeBackWind | Push Slice | 24.2° | **194.7** | 231.5 | 38.8 | 5851/-1297 | 12.8 |
| HighAltitudeBackWind | Straight Hook | 19.7° | **199.5** | 243.9 | 30.4 | 4901/1086 | 2.5 |
| HighAltitudeBackWind | Straight Slice | 22.7° | **196.9** | 236.0 | 36.1 | 5534/-1227 | -3.0 |
| HighAltitudeFrontWind | Straight | 21.2° | **173.8** | 192.7 | 43.5 | 5344/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 19.7° | **178.1** | 199.1 | 40.2 | 5020/0 | -16.9 |
| HighAltitudeFrontWind | Pull Hook | 18.2° | **180.5** | 204.2 | 35.8 | 4584/1016 | -6.4 |
| HighAltitudeFrontWind | Pull Slice | 21.2° | **173.5** | 193.2 | 42.6 | 5218/-1157 | -28.1 |
| HighAltitudeFrontWind | Push Straight | 22.7° | **169.1** | 186.2 | 46.5 | 5669/0 | 16.2 |
| HighAltitudeFrontWind | Push Hook | 21.2° | **173.5** | 193.2 | 42.6 | 5218/1157 | 28.1 |
| HighAltitudeFrontWind | Push Slice | 24.2° | **163.4** | 179.3 | 48.4 | 5851/-1297 | 4.0 |
| HighAltitudeFrontWind | Straight Hook | 19.7° | **177.2** | 198.7 | 39.3 | 4901/1086 | 11.3 |
| HighAltitudeFrontWind | Straight Slice | 22.7° | **168.6** | 186.1 | 45.6 | 5534/-1227 | -11.9 |
| HighAltitudeLeftWind | Straight | 21.2° | **190.2** | 220.6 | 38.6 | 5344/0 | 13.9 |
| HighAltitudeLeftWind | Pull Straight | 19.7° | **191.8** | 223.6 | 35.9 | 5020/0 | -3.4 |
| HighAltitudeLeftWind | Pull Hook | 18.2° | **195.2** | 231.5 | 32.4 | 4584/1016 | 2.7 |
| HighAltitudeLeftWind | Pull Slice | 21.2° | **185.3** | 213.6 | 37.6 | 5218/-1157 | -9.9 |
| HighAltitudeLeftWind | Push Straight | 22.7° | **187.8** | 217.0 | 41.0 | 5669/0 | 30.4 |
| HighAltitudeLeftWind | Push Hook | 21.2° | **193.0** | 226.1 | 38.1 | 5218/1157 | 37.5 |
| HighAltitudeLeftWind | Push Slice | 24.2° | **181.1** | 207.3 | 42.4 | 5851/-1297 | 23.4 |
| HighAltitudeLeftWind | Straight Hook | 19.7° | **194.4** | 229.0 | 35.4 | 4901/1086 | 20.5 |
| HighAltitudeLeftWind | Straight Slice | 22.7° | **183.3** | 210.5 | 40.1 | 5534/-1227 | 7.0 |
| HighAltitudeRightWind | Straight | 21.2° | **190.2** | 220.6 | 38.6 | 5344/0 | -13.9 |
| HighAltitudeRightWind | Pull Straight | 19.7° | **193.7** | 227.5 | 35.1 | 5020/0 | -29.7 |
| HighAltitudeRightWind | Pull Hook | 18.2° | **191.4** | 226.8 | 30.6 | 4584/1016 | -22.8 |
| HighAltitudeRightWind | Pull Slice | 21.2° | **193.0** | 226.1 | 38.1 | 5218/-1157 | -37.5 |
| HighAltitudeRightWind | Push Straight | 22.7° | **185.4** | 212.8 | 41.9 | 5669/0 | 1.6 |
| HighAltitudeRightWind | Push Hook | 21.2° | **185.3** | 213.6 | 37.6 | 5218/1157 | 9.9 |
| HighAltitudeRightWind | Push Slice | 24.2° | **183.4** | 210.6 | 44.7 | 5851/-1297 | -7.3 |
| HighAltitudeRightWind | Straight Hook | 19.7° | **188.9** | 220.6 | 34.2 | 4901/1086 | -6.2 |
| HighAltitudeRightWind | Straight Slice | 22.7° | **188.7** | 218.7 | 41.5 | 5534/-1227 | -22.3 |

---

## Club: 7i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 23.9° | **145.2** | 164.6 | 39.8 | 5836/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 22.4° | **149.2** | 170.3 | 37.8 | 5523/0 | -13.0 |
| SeaLevelNoWind | Pull Hook | 20.9° | **152.5** | 175.4 | 35.0 | 5086/1127 | -5.6 |
| SeaLevelNoWind | Pull Slice | 23.9° | **145.0** | 164.6 | 39.3 | 5698/-1263 | -20.0 |
| SeaLevelNoWind | Push Straight | 25.4° | **141.1** | 159.1 | 41.7 | 6150/0 | 12.3 |
| SeaLevelNoWind | Push Hook | 23.9° | **145.0** | 164.6 | 39.3 | 5698/1263 | 20.0 |
| SeaLevelNoWind | Push Slice | 26.9° | **136.8** | 153.7 | 43.0 | 6310/-1399 | 5.1 |
| SeaLevelNoWind | Straight Hook | 22.4° | **148.9** | 170.1 | 37.2 | 5392/1195 | 7.6 |
| SeaLevelNoWind | Straight Slice | 25.4° | **141.0** | 159.1 | 41.2 | 6004/-1331 | -7.2 |
| SeaLevelBackWind | Straight | 23.9° | **160.6** | 190.9 | 35.1 | 5836/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 22.4° | **163.5** | 195.6 | 33.1 | 5523/0 | -13.1 |
| SeaLevelBackWind | Pull Hook | 20.9° | **165.7** | 200.1 | 30.6 | 5086/1127 | -9.5 |
| SeaLevelBackWind | Pull Slice | 23.9° | **159.9** | 190.2 | 34.7 | 5698/-1263 | -16.4 |
| SeaLevelBackWind | Push Straight | 25.4° | **157.3** | 185.9 | 37.1 | 6150/0 | 12.5 |
| SeaLevelBackWind | Push Hook | 23.9° | **159.9** | 190.2 | 34.7 | 5698/1263 | 16.4 |
| SeaLevelBackWind | Push Slice | 26.9° | **154.1** | 181.2 | 38.6 | 6310/-1399 | 8.9 |
| SeaLevelBackWind | Straight Hook | 22.4° | **163.0** | 195.3 | 32.7 | 5392/1195 | 3.8 |
| SeaLevelBackWind | Straight Slice | 25.4° | **157.1** | 185.8 | 36.7 | 6004/-1331 | -3.5 |
| SeaLevelFrontWind | Straight | 23.9° | **123.9** | 134.5 | 45.0 | 5836/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 22.4° | **129.0** | 140.6 | 43.0 | 5523/0 | -12.8 |
| SeaLevelFrontWind | Pull Hook | 20.9° | **133.3** | 146.2 | 39.8 | 5086/1127 | -1.1 |
| SeaLevelFrontWind | Pull Slice | 23.9° | **124.2** | 135.4 | 44.4 | 5698/-1263 | -24.0 |
| SeaLevelFrontWind | Push Straight | 25.4° | **119.1** | 128.7 | 46.9 | 6150/0 | 12.1 |
| SeaLevelFrontWind | Push Hook | 23.9° | **124.2** | 135.4 | 44.4 | 5698/1263 | 24.0 |
| SeaLevelFrontWind | Push Slice | 26.9° | **114.1** | 122.9 | 47.9 | 6310/-1399 | 0.6 |
| SeaLevelFrontWind | Straight Hook | 22.4° | **128.7** | 140.7 | 42.2 | 5392/1195 | 11.9 |
| SeaLevelFrontWind | Straight Slice | 25.4° | **119.0** | 128.9 | 46.3 | 6004/-1331 | -11.4 |
| SeaLevelLeftWind | Straight | 23.9° | **145.5** | 166.2 | 40.0 | 5836/0 | 15.7 |
| SeaLevelLeftWind | Pull Straight | 22.4° | **148.0** | 169.3 | 38.4 | 5523/0 | 2.6 |
| SeaLevelLeftWind | Pull Hook | 20.9° | **154.0** | 178.7 | 36.3 | 5086/1127 | 10.3 |
| SeaLevelLeftWind | Pull Slice | 23.9° | **141.4** | 159.8 | 39.2 | 5698/-1263 | -4.5 |
| SeaLevelLeftWind | Push Straight | 25.4° | **143.0** | 163.2 | 41.5 | 6150/0 | 28.2 |
| SeaLevelLeftWind | Push Hook | 23.9° | **149.1** | 172.2 | 39.8 | 5698/1263 | 35.8 |
| SeaLevelLeftWind | Push Slice | 26.9° | **136.8** | 154.4 | 42.0 | 6310/-1399 | 21.4 |
| SeaLevelLeftWind | Straight Hook | 22.4° | **151.7** | 175.6 | 38.1 | 5392/1195 | 23.5 |
| SeaLevelLeftWind | Straight Slice | 25.4° | **139.1** | 157.0 | 40.7 | 6004/-1331 | 8.7 |
| SeaLevelRightWind | Straight | 23.9° | **145.5** | 166.2 | 40.0 | 5836/0 | -15.7 |
| SeaLevelRightWind | Pull Straight | 22.4° | **151.0** | 174.0 | 37.6 | 5523/0 | -28.0 |
| SeaLevelRightWind | Pull Hook | 20.9° | **151.6** | 174.9 | 34.1 | 5086/1127 | -20.1 |
| SeaLevelRightWind | Pull Slice | 23.9° | **149.1** | 172.2 | 39.8 | 5698/-1263 | -35.8 |
| SeaLevelRightWind | Push Straight | 25.4° | **139.6** | 158.1 | 42.4 | 6150/0 | -4.2 |
| SeaLevelRightWind | Push Hook | 23.9° | **141.4** | 159.8 | 39.2 | 5698/1263 | 4.5 |
| SeaLevelRightWind | Push Slice | 26.9° | **137.5** | 156.3 | 44.4 | 6310/-1399 | -12.6 |
| SeaLevelRightWind | Straight Hook | 22.4° | **146.7** | 167.4 | 36.7 | 5392/1195 | -7.4 |
| SeaLevelRightWind | Straight Slice | 25.4° | **143.4** | 164.3 | 42.1 | 6004/-1331 | -23.9 |
| HighAltitudeNoWind | Straight | 23.9° | **171.3** | 198.3 | 37.9 | 5836/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 22.4° | **174.3** | 203.4 | 35.4 | 5523/0 | -15.2 |
| HighAltitudeNoWind | Pull Hook | 20.9° | **175.7** | 207.5 | 32.1 | 5086/1127 | -10.3 |
| HighAltitudeNoWind | Pull Slice | 23.9° | **170.7** | 198.0 | 37.3 | 5698/-1263 | -20.2 |
| HighAltitudeNoWind | Push Straight | 25.4° | **168.0** | 193.0 | 40.3 | 6150/0 | 14.6 |
| HighAltitudeNoWind | Push Hook | 23.9° | **170.7** | 198.0 | 37.3 | 5698/1263 | 20.2 |
| HighAltitudeNoWind | Push Slice | 26.9° | **163.8** | 187.2 | 42.1 | 6310/-1399 | 9.0 |
| HighAltitudeNoWind | Straight Hook | 22.4° | **173.6** | 203.0 | 34.8 | 5392/1195 | 5.3 |
| HighAltitudeNoWind | Straight Slice | 25.4° | **167.4** | 192.6 | 39.8 | 6004/-1331 | -5.4 |
| HighAltitudeBackWind | Straight | 23.9° | **180.9** | 218.8 | 33.6 | 5836/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 22.4° | **182.6** | 222.9 | 31.2 | 5523/0 | -15.0 |
| HighAltitudeBackWind | Pull Hook | 20.9° | **182.5** | 225.8 | 28.3 | 5086/1127 | -13.8 |
| HighAltitudeBackWind | Pull Slice | 23.9° | **180.0** | 218.0 | 33.2 | 5698/-1263 | -16.2 |
| HighAltitudeBackWind | Push Straight | 25.4° | **178.8** | 214.4 | 35.9 | 6150/0 | 14.6 |
| HighAltitudeBackWind | Push Hook | 23.9° | **180.0** | 218.0 | 33.2 | 5698/1263 | 16.2 |
| HighAltitudeBackWind | Push Slice | 26.9° | **176.1** | 209.9 | 37.9 | 6310/-1399 | 12.8 |
| HighAltitudeBackWind | Straight Hook | 22.4° | **181.7** | 222.2 | 30.8 | 5392/1195 | 1.4 |
| HighAltitudeBackWind | Straight Slice | 25.4° | **178.2** | 214.1 | 35.5 | 6004/-1331 | -1.5 |
| HighAltitudeFrontWind | Straight | 23.9° | **156.1** | 172.6 | 42.8 | 5836/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 22.4° | **160.4** | 178.7 | 40.2 | 5523/0 | -15.3 |
| HighAltitudeFrontWind | Pull Hook | 20.9° | **163.2** | 183.8 | 36.5 | 5086/1127 | -6.0 |
| HighAltitudeFrontWind | Pull Slice | 23.9° | **156.0** | 173.1 | 42.1 | 5698/-1263 | -24.7 |
| HighAltitudeFrontWind | Push Straight | 25.4° | **151.5** | 166.8 | 45.3 | 6150/0 | 14.6 |
| HighAltitudeFrontWind | Push Hook | 23.9° | **156.0** | 173.1 | 42.1 | 5698/1263 | 24.7 |
| HighAltitudeFrontWind | Push Slice | 26.9° | **146.5** | 160.6 | 46.8 | 6310/-1399 | 4.6 |
| HighAltitudeFrontWind | Straight Hook | 22.4° | **159.7** | 178.4 | 39.4 | 5392/1195 | 9.7 |
| HighAltitudeFrontWind | Straight Slice | 25.4° | **151.3** | 166.8 | 44.6 | 6004/-1331 | -9.8 |
| HighAltitudeLeftWind | Straight | 23.9° | **171.6** | 199.2 | 38.1 | 5836/0 | 13.1 |
| HighAltitudeLeftWind | Pull Straight | 22.4° | **173.6** | 202.3 | 36.0 | 5523/0 | -2.5 |
| HighAltitudeLeftWind | Pull Hook | 20.9° | **177.7** | 210.4 | 33.2 | 5086/1127 | 2.6 |
| HighAltitudeLeftWind | Pull Slice | 23.9° | **167.5** | 193.0 | 37.3 | 5698/-1263 | -7.4 |
| HighAltitudeLeftWind | Push Straight | 25.4° | **169.2** | 195.8 | 40.1 | 6150/0 | 27.9 |
| HighAltitudeLeftWind | Push Hook | 23.9° | **174.5** | 204.5 | 37.8 | 5698/1263 | 33.6 |
| HighAltitudeLeftWind | Push Slice | 26.9° | **163.3** | 187.0 | 41.2 | 6310/-1399 | 22.8 |
| HighAltitudeLeftWind | Straight Hook | 22.4° | **176.3** | 207.6 | 35.6 | 5392/1195 | 18.5 |
| HighAltitudeLeftWind | Straight Slice | 25.4° | **165.4** | 190.0 | 39.3 | 6004/-1331 | 7.9 |
| HighAltitudeRightWind | Straight | 23.9° | **171.6** | 199.2 | 38.1 | 5836/0 | -13.1 |
| HighAltitudeRightWind | Pull Straight | 22.4° | **175.6** | 206.2 | 35.2 | 5523/0 | -27.5 |
| HighAltitudeRightWind | Pull Hook | 20.9° | **174.3** | 206.3 | 31.4 | 5086/1127 | -21.9 |
| HighAltitudeRightWind | Pull Slice | 23.9° | **174.5** | 204.5 | 37.8 | 5698/-1263 | -33.6 |
| HighAltitudeRightWind | Push Straight | 25.4° | **166.9** | 191.7 | 40.9 | 6150/0 | 0.9 |
| HighAltitudeRightWind | Push Hook | 23.9° | **167.5** | 193.0 | 37.3 | 5698/1263 | 7.4 |
| HighAltitudeRightWind | Push Slice | 26.9° | **165.0** | 189.5 | 43.3 | 6310/-1399 | -6.0 |
| HighAltitudeRightWind | Straight Hook | 22.4° | **171.5** | 200.1 | 34.4 | 5392/1195 | -7.0 |
| HighAltitudeRightWind | Straight Slice | 25.4° | **170.0** | 197.1 | 40.6 | 6004/-1331 | -19.5 |

---

## Club: 8i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 27.5° | **127.6** | 144.4 | 38.3 | 6452/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 26.0° | **131.2** | 149.3 | 36.7 | 6149/0 | -11.4 |
| SeaLevelNoWind | Pull Hook | 24.5° | **134.4** | 154.2 | 34.4 | 5708/1265 | -6.0 |
| SeaLevelNoWind | Pull Slice | 27.5° | **127.5** | 144.4 | 37.9 | 6299/-1396 | -16.4 |
| SeaLevelNoWind | Push Straight | 29.0° | **123.9** | 139.7 | 39.8 | 6754/0 | 10.8 |
| SeaLevelNoWind | Push Hook | 27.5° | **127.5** | 144.4 | 37.9 | 6299/1396 | 16.4 |
| SeaLevelNoWind | Push Slice | 30.5° | **120.2** | 134.9 | 40.9 | 6889/-1527 | 5.7 |
| SeaLevelNoWind | Straight Hook | 26.0° | **130.9** | 149.2 | 36.2 | 6003/1331 | 5.5 |
| SeaLevelNoWind | Straight Slice | 29.0° | **123.9** | 139.7 | 39.4 | 6594/-1462 | -5.1 |
| SeaLevelBackWind | Straight | 27.5° | **141.9** | 168.9 | 34.0 | 6452/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 26.0° | **144.6** | 173.3 | 32.4 | 6149/0 | -11.6 |
| SeaLevelBackWind | Pull Hook | 24.5° | **147.0** | 177.6 | 30.3 | 5708/1265 | -9.6 |
| SeaLevelBackWind | Pull Slice | 27.5° | **141.6** | 168.6 | 33.7 | 6299/-1396 | -13.2 |
| SeaLevelBackWind | Push Straight | 29.0° | **139.1** | 164.5 | 35.6 | 6754/0 | 11.0 |
| SeaLevelBackWind | Push Hook | 27.5° | **141.6** | 168.6 | 33.7 | 6299/1396 | 13.2 |
| SeaLevelBackWind | Push Slice | 30.5° | **136.1** | 160.1 | 36.9 | 6889/-1527 | 9.1 |
| SeaLevelBackWind | Straight Hook | 26.0° | **144.4** | 173.2 | 32.0 | 6003/1331 | 2.0 |
| SeaLevelBackWind | Straight Slice | 29.0° | **139.0** | 164.5 | 35.3 | 6594/-1462 | -1.8 |
| SeaLevelFrontWind | Straight | 27.5° | **107.6** | 116.2 | 43.2 | 6452/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 26.0° | **112.1** | 121.7 | 41.5 | 6149/0 | -11.3 |
| SeaLevelFrontWind | Pull Hook | 24.5° | **116.2** | 126.9 | 39.1 | 5708/1265 | -1.8 |
| SeaLevelFrontWind | Pull Slice | 27.5° | **108.0** | 117.1 | 42.6 | 6299/-1396 | -20.1 |
| SeaLevelFrontWind | Push Straight | 29.0° | **103.4** | 111.1 | 44.6 | 6754/0 | 10.6 |
| SeaLevelFrontWind | Push Hook | 27.5° | **108.0** | 117.1 | 42.6 | 6299/1396 | 20.1 |
| SeaLevelFrontWind | Push Slice | 30.5° | **99.1** | 106.0 | 45.4 | 6889/-1527 | 1.6 |
| SeaLevelFrontWind | Straight Hook | 26.0° | **112.0** | 121.8 | 40.9 | 6003/1331 | 9.5 |
| SeaLevelFrontWind | Straight Slice | 29.0° | **103.5** | 111.4 | 44.1 | 6594/-1462 | -9.0 |
| SeaLevelLeftWind | Straight | 27.5° | **127.7** | 145.6 | 38.5 | 6452/0 | 14.7 |
| SeaLevelLeftWind | Pull Straight | 26.0° | **130.0** | 148.4 | 37.3 | 6149/0 | 3.1 |
| SeaLevelLeftWind | Pull Hook | 24.5° | **135.5** | 156.9 | 35.7 | 5708/1265 | 8.9 |
| SeaLevelLeftWind | Pull Slice | 27.5° | **124.4** | 140.5 | 37.8 | 6299/-1396 | -1.9 |
| SeaLevelLeftWind | Push Straight | 29.0° | **125.7** | 143.2 | 39.6 | 6754/0 | 25.6 |
| SeaLevelLeftWind | Push Hook | 27.5° | **131.0** | 151.1 | 38.4 | 6299/1396 | 31.2 |
| SeaLevelLeftWind | Push Slice | 30.5° | **120.5** | 136.1 | 40.0 | 6889/-1527 | 20.9 |
| SeaLevelLeftWind | Straight Hook | 26.0° | **133.3** | 154.0 | 37.1 | 6003/1331 | 20.4 |
| SeaLevelLeftWind | Straight Slice | 29.0° | **122.4** | 138.2 | 38.9 | 6594/-1462 | 9.8 |
| SeaLevelRightWind | Straight | 27.5° | **127.7** | 145.6 | 38.5 | 6452/0 | -14.7 |
| SeaLevelRightWind | Pull Straight | 26.0° | **132.7** | 152.8 | 36.5 | 6149/0 | -25.5 |
| SeaLevelRightWind | Pull Hook | 24.5° | **133.8** | 154.2 | 33.6 | 5708/1265 | -19.6 |
| SeaLevelRightWind | Pull Slice | 27.5° | **131.0** | 151.1 | 38.4 | 6299/-1396 | -31.2 |
| SeaLevelRightWind | Push Straight | 29.0° | **122.6** | 138.8 | 40.4 | 6754/0 | -4.6 |
| SeaLevelRightWind | Push Hook | 27.5° | **124.4** | 140.5 | 37.8 | 6299/1396 | 1.9 |
| SeaLevelRightWind | Push Slice | 30.5° | **120.5** | 136.9 | 42.2 | 6889/-1527 | -10.7 |
| SeaLevelRightWind | Straight Hook | 26.0° | **129.3** | 147.3 | 35.7 | 6003/1331 | -8.5 |
| SeaLevelRightWind | Straight Slice | 29.0° | **126.0** | 144.0 | 40.3 | 6594/-1462 | -20.7 |
| HighAltitudeNoWind | Straight | 27.5° | **150.7** | 174.1 | 37.3 | 6452/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 26.0° | **153.7** | 179.0 | 35.2 | 6149/0 | -13.4 |
| HighAltitudeNoWind | Pull Hook | 24.5° | **155.8** | 183.3 | 32.6 | 5708/1265 | -10.0 |
| HighAltitudeNoWind | Pull Slice | 27.5° | **150.3** | 173.9 | 36.8 | 6299/-1396 | -16.7 |
| HighAltitudeNoWind | Push Straight | 29.0° | **147.5** | 169.1 | 39.2 | 6754/0 | 12.9 |
| HighAltitudeNoWind | Push Hook | 27.5° | **150.3** | 173.9 | 36.8 | 6299/1396 | 16.7 |
| HighAltitudeNoWind | Push Slice | 30.5° | **143.9** | 163.9 | 40.7 | 6889/-1527 | 9.2 |
| HighAltitudeNoWind | Straight Hook | 26.0° | **153.3** | 178.8 | 34.7 | 6003/1331 | 3.6 |
| HighAltitudeNoWind | Straight Slice | 29.0° | **147.1** | 168.9 | 38.8 | 6594/-1462 | -3.5 |
| HighAltitudeBackWind | Straight | 27.5° | **160.2** | 193.8 | 33.3 | 6452/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 26.0° | **162.1** | 197.8 | 31.3 | 6149/0 | -13.3 |
| HighAltitudeBackWind | Pull Hook | 24.5° | **162.9** | 201.2 | 28.9 | 5708/1265 | -13.3 |
| HighAltitudeBackWind | Pull Slice | 27.5° | **159.6** | 193.3 | 33.0 | 6299/-1396 | -13.1 |
| HighAltitudeBackWind | Push Straight | 29.0° | **157.9** | 189.4 | 35.2 | 6754/0 | 12.8 |
| HighAltitudeBackWind | Push Hook | 27.5° | **159.6** | 193.3 | 33.0 | 6299/1396 | 13.1 |
| HighAltitudeBackWind | Push Slice | 30.5° | **155.3** | 185.1 | 36.9 | 6889/-1527 | 12.5 |
| HighAltitudeBackWind | Straight Hook | 26.0° | **161.4** | 197.3 | 31.0 | 6003/1331 | 0.1 |
| HighAltitudeBackWind | Straight Slice | 29.0° | **157.7** | 189.4 | 35.0 | 6594/-1462 | -0.1 |
| HighAltitudeFrontWind | Straight | 27.5° | **136.1** | 150.2 | 41.8 | 6452/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 26.0° | **140.2** | 155.6 | 39.7 | 6149/0 | -13.4 |
| HighAltitudeFrontWind | Pull Hook | 24.5° | **143.4** | 160.4 | 36.8 | 5708/1265 | -6.0 |
| HighAltitudeFrontWind | Pull Slice | 27.5° | **136.1** | 150.7 | 41.3 | 6299/-1396 | -20.7 |
| HighAltitudeFrontWind | Push Straight | 29.0° | **132.0** | 144.8 | 43.8 | 6754/0 | 12.8 |
| HighAltitudeFrontWind | Push Hook | 27.5° | **136.1** | 150.7 | 41.3 | 6299/1396 | 20.7 |
| HighAltitudeFrontWind | Push Slice | 30.5° | **127.4** | 139.2 | 45.0 | 6889/-1527 | 5.2 |
| HighAltitudeFrontWind | Straight Hook | 26.0° | **139.8** | 155.5 | 39.1 | 6003/1331 | 7.7 |
| HighAltitudeFrontWind | Straight Slice | 29.0° | **131.8** | 144.9 | 43.2 | 6594/-1462 | -7.5 |
| HighAltitudeLeftWind | Straight | 27.5° | **150.9** | 174.9 | 37.5 | 6452/0 | 12.2 |
| HighAltitudeLeftWind | Pull Straight | 26.0° | **153.0** | 178.0 | 35.8 | 6149/0 | -1.4 |
| HighAltitudeLeftWind | Pull Hook | 24.5° | **157.4** | 185.8 | 33.7 | 5708/1265 | 2.3 |
| HighAltitudeLeftWind | Pull Slice | 27.5° | **147.5** | 169.7 | 36.8 | 6299/-1396 | -4.7 |
| HighAltitudeLeftWind | Push Straight | 29.0° | **148.7** | 171.8 | 39.0 | 6754/0 | 25.2 |
| HighAltitudeLeftWind | Push Hook | 27.5° | **153.6** | 179.7 | 37.2 | 6299/1396 | 29.1 |
| HighAltitudeLeftWind | Push Slice | 30.5° | **143.5** | 164.1 | 39.9 | 6889/-1527 | 22.0 |
| HighAltitudeLeftWind | Straight Hook | 26.0° | **155.6** | 182.8 | 35.5 | 6003/1331 | 16.0 |
| HighAltitudeLeftWind | Straight Slice | 29.0° | **145.5** | 166.9 | 38.4 | 6594/-1462 | 8.9 |
| HighAltitudeRightWind | Straight | 27.5° | **150.9** | 174.9 | 37.5 | 6452/0 | -12.2 |
| HighAltitudeRightWind | Pull Straight | 26.0° | **154.9** | 181.6 | 35.0 | 6149/0 | -25.0 |
| HighAltitudeRightWind | Pull Hook | 24.5° | **154.8** | 182.6 | 31.9 | 5708/1265 | -21.1 |
| HighAltitudeRightWind | Pull Slice | 27.5° | **153.6** | 179.7 | 37.2 | 6299/-1396 | -29.1 |
| HighAltitudeRightWind | Push Straight | 29.0° | **146.5** | 168.0 | 39.8 | 6754/0 | 0.0 |
| HighAltitudeRightWind | Push Hook | 27.5° | **147.5** | 169.7 | 36.8 | 6299/1396 | 4.7 |
| HighAltitudeRightWind | Push Slice | 30.5° | **144.6** | 165.7 | 41.8 | 6889/-1527 | -4.8 |
| HighAltitudeRightWind | Straight Hook | 26.0° | **151.4** | 176.4 | 34.4 | 6003/1331 | -7.9 |
| HighAltitudeRightWind | Straight Slice | 29.0° | **149.3** | 172.8 | 39.6 | 6594/-1462 | -16.7 |

---

## Club: 9i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 31.1° | **112.7** | 127.2 | 37.2 | 7096/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 29.6° | **116.0** | 131.6 | 35.8 | 6801/0 | -10.1 |
| SeaLevelNoWind | Pull Hook | 28.1° | **119.1** | 135.9 | 34.0 | 6352/1408 | -6.3 |
| SeaLevelNoWind | Pull Slice | 31.1° | **112.7** | 127.3 | 36.9 | 6928/-1536 | -13.5 |
| SeaLevelNoWind | Push Straight | 32.6° | **109.3** | 122.8 | 38.5 | 7391/0 | 9.5 |
| SeaLevelNoWind | Push Hook | 31.1° | **112.7** | 127.3 | 36.9 | 6928/1536 | 13.5 |
| SeaLevelNoWind | Push Slice | 34.1° | **106.1** | 118.8 | 39.4 | 7504/-1664 | 6.0 |
| SeaLevelNoWind | Straight Hook | 29.6° | **115.9** | 131.6 | 35.5 | 6640/1472 | 3.9 |
| SeaLevelNoWind | Straight Slice | 32.6° | **109.4** | 122.9 | 38.2 | 7216/-1600 | -3.5 |
| SeaLevelBackWind | Straight | 31.1° | **126.5** | 150.2 | 33.3 | 7096/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 29.6° | **129.0** | 154.2 | 31.9 | 6801/0 | -10.3 |
| SeaLevelBackWind | Pull Hook | 28.1° | **131.5** | 158.5 | 30.3 | 6352/1408 | -9.6 |
| SeaLevelBackWind | Pull Slice | 31.1° | **126.4** | 150.1 | 33.1 | 6928/-1536 | -10.7 |
| SeaLevelBackWind | Push Straight | 32.6° | **123.9** | 146.2 | 34.7 | 7391/0 | 9.7 |
| SeaLevelBackWind | Push Hook | 31.1° | **126.4** | 150.1 | 33.1 | 6928/1536 | 10.7 |
| SeaLevelBackWind | Push Slice | 34.1° | **121.6** | 142.7 | 35.8 | 7504/-1664 | 9.0 |
| SeaLevelBackWind | Straight Hook | 29.6° | **129.1** | 154.4 | 31.7 | 6640/1472 | 0.8 |
| SeaLevelBackWind | Straight Slice | 32.6° | **124.0** | 146.3 | 34.5 | 7216/-1600 | -0.6 |
| SeaLevelFrontWind | Straight | 31.1° | **93.8** | 100.4 | 41.6 | 7096/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 29.6° | **97.8** | 105.3 | 40.3 | 6801/0 | -9.9 |
| SeaLevelFrontWind | Pull Hook | 28.1° | **101.6** | 110.1 | 38.4 | 6352/1408 | -2.4 |
| SeaLevelFrontWind | Pull Slice | 31.1° | **94.2** | 101.2 | 41.2 | 6928/-1536 | -16.9 |
| SeaLevelFrontWind | Push Straight | 32.6° | **90.0** | 95.7 | 42.8 | 7391/0 | 9.3 |
| SeaLevelFrontWind | Push Hook | 31.1° | **94.2** | 101.2 | 41.2 | 6928/1536 | 16.9 |
| SeaLevelFrontWind | Push Slice | 34.1° | **86.1** | 91.2 | 43.5 | 7504/-1664 | 2.3 |
| SeaLevelFrontWind | Straight Hook | 29.6° | **97.8** | 105.6 | 39.9 | 6640/1472 | 7.6 |
| SeaLevelFrontWind | Straight Slice | 32.6° | **90.1** | 96.1 | 42.4 | 7216/-1600 | -7.1 |
| SeaLevelLeftWind | Straight | 31.1° | **113.0** | 128.6 | 37.4 | 7096/0 | 14.0 |
| SeaLevelLeftWind | Pull Straight | 29.6° | **114.9** | 130.9 | 36.4 | 6801/0 | 3.8 |
| SeaLevelLeftWind | Pull Hook | 28.1° | **119.9** | 138.1 | 35.2 | 6352/1408 | 7.9 |
| SeaLevelLeftWind | Pull Slice | 31.1° | **110.1** | 124.1 | 36.8 | 6928/-1536 | 0.3 |
| SeaLevelLeftWind | Push Straight | 32.6° | **110.9** | 126.3 | 38.3 | 7391/0 | 23.5 |
| SeaLevelLeftWind | Push Hook | 31.1° | **115.8** | 133.1 | 37.3 | 6928/1536 | 27.5 |
| SeaLevelLeftWind | Push Slice | 34.1° | **106.7** | 120.4 | 38.6 | 7504/-1664 | 20.3 |
| SeaLevelLeftWind | Straight Hook | 29.6° | **117.9** | 135.6 | 36.3 | 6640/1472 | 18.1 |
| SeaLevelLeftWind | Straight Slice | 32.6° | **108.3** | 122.2 | 37.7 | 7216/-1600 | 10.6 |
| SeaLevelRightWind | Straight | 31.1° | **113.0** | 128.6 | 37.4 | 7096/0 | -14.0 |
| SeaLevelRightWind | Pull Straight | 29.6° | **117.6** | 135.0 | 35.7 | 6801/0 | -23.5 |
| SeaLevelRightWind | Pull Hook | 28.1° | **118.9** | 136.4 | 33.2 | 6352/1408 | -19.3 |
| SeaLevelRightWind | Pull Slice | 31.1° | **115.8** | 133.1 | 37.3 | 6928/-1536 | -27.5 |
| SeaLevelRightWind | Push Straight | 32.6° | **108.1** | 122.1 | 39.0 | 7391/0 | -5.0 |
| SeaLevelRightWind | Push Hook | 31.1° | **110.1** | 124.1 | 36.8 | 6928/1536 | -0.3 |
| SeaLevelRightWind | Push Slice | 34.1° | **106.3** | 120.5 | 40.5 | 7504/-1664 | -9.6 |
| SeaLevelRightWind | Straight Hook | 29.6° | **114.6** | 130.3 | 35.0 | 6640/1472 | -9.5 |
| SeaLevelRightWind | Straight Slice | 32.6° | **111.1** | 126.8 | 39.0 | 7216/-1600 | -18.3 |
| HighAltitudeNoWind | Straight | 31.1° | **133.4** | 153.2 | 36.8 | 7096/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 29.6° | **136.4** | 157.9 | 35.1 | 6801/0 | -11.9 |
| HighAltitudeNoWind | Pull Hook | 28.1° | **138.8** | 162.3 | 33.0 | 6352/1408 | -9.8 |
| HighAltitudeNoWind | Pull Slice | 31.1° | **133.3** | 153.2 | 36.5 | 6928/-1536 | -13.8 |
| HighAltitudeNoWind | Push Straight | 32.6° | **130.3** | 148.7 | 38.5 | 7391/0 | 11.4 |
| HighAltitudeNoWind | Push Hook | 31.1° | **133.3** | 153.2 | 36.5 | 6928/1536 | 13.8 |
| HighAltitudeNoWind | Push Slice | 34.1° | **127.0** | 144.2 | 39.7 | 7504/-1664 | 9.1 |
| HighAltitudeNoWind | Straight Hook | 29.6° | **136.1** | 157.8 | 34.8 | 6640/1472 | 2.3 |
| HighAltitudeNoWind | Straight Slice | 32.6° | **130.2** | 148.8 | 38.2 | 7216/-1600 | -2.1 |
| HighAltitudeBackWind | Straight | 31.1° | **143.1** | 172.5 | 33.2 | 7096/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 29.6° | **145.0** | 176.3 | 31.5 | 6801/0 | -11.8 |
| HighAltitudeBackWind | Pull Hook | 28.1° | **146.6** | 180.1 | 29.6 | 6352/1408 | -12.8 |
| HighAltitudeBackWind | Pull Slice | 31.1° | **142.7** | 172.2 | 33.0 | 6928/-1536 | -10.7 |
| HighAltitudeBackWind | Push Straight | 32.6° | **140.8** | 168.4 | 34.9 | 7391/0 | 11.4 |
| HighAltitudeBackWind | Push Hook | 31.1° | **142.7** | 172.2 | 33.0 | 6928/1536 | 10.7 |
| HighAltitudeBackWind | Push Slice | 34.1° | **138.4** | 164.3 | 36.4 | 7504/-1664 | 12.1 |
| HighAltitudeBackWind | Straight Hook | 29.6° | **144.8** | 176.2 | 31.3 | 6640/1472 | -0.8 |
| HighAltitudeBackWind | Straight Slice | 32.6° | **140.6** | 168.3 | 34.7 | 7216/-1600 | 0.9 |
| HighAltitudeFrontWind | Straight | 31.1° | **119.3** | 130.9 | 41.1 | 7096/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 29.6° | **123.2** | 136.0 | 39.3 | 6801/0 | -11.9 |
| HighAltitudeFrontWind | Pull Hook | 28.1° | **126.4** | 140.6 | 37.0 | 6352/1408 | -6.1 |
| HighAltitudeFrontWind | Pull Slice | 31.1° | **119.4** | 131.4 | 40.6 | 6928/-1536 | -17.4 |
| HighAltitudeFrontWind | Push Straight | 32.6° | **115.4** | 125.9 | 42.7 | 7391/0 | 11.3 |
| HighAltitudeFrontWind | Push Hook | 31.1° | **119.4** | 131.4 | 40.6 | 6928/1536 | 17.4 |
| HighAltitudeFrontWind | Push Slice | 34.1° | **111.2** | 120.8 | 43.7 | 7504/-1664 | 5.5 |
| HighAltitudeFrontWind | Straight Hook | 29.6° | **123.0** | 136.0 | 38.9 | 6640/1472 | 6.0 |
| HighAltitudeFrontWind | Straight Slice | 32.6° | **115.3** | 126.0 | 42.2 | 7216/-1600 | -5.7 |
| HighAltitudeLeftWind | Straight | 31.1° | **133.7** | 154.2 | 37.0 | 7096/0 | 11.6 |
| HighAltitudeLeftWind | Pull Straight | 29.6° | **135.7** | 157.0 | 35.7 | 6801/0 | -0.4 |
| HighAltitudeLeftWind | Pull Hook | 28.1° | **140.0** | 164.2 | 34.0 | 6352/1408 | 2.0 |
| HighAltitudeLeftWind | Pull Slice | 31.1° | **130.8** | 149.7 | 36.5 | 6928/-1536 | -2.4 |
| HighAltitudeLeftWind | Push Straight | 32.6° | **131.5** | 151.3 | 38.3 | 7391/0 | 23.1 |
| HighAltitudeLeftWind | Push Hook | 31.1° | **136.1** | 158.4 | 36.9 | 6928/1536 | 25.7 |
| HighAltitudeLeftWind | Push Slice | 34.1° | **126.8** | 144.7 | 39.0 | 7504/-1664 | 21.2 |
| HighAltitudeLeftWind | Straight Hook | 29.6° | **138.1** | 161.3 | 35.5 | 6640/1472 | 14.1 |
| HighAltitudeLeftWind | Straight Slice | 32.6° | **128.9** | 147.3 | 37.8 | 7216/-1600 | 9.7 |
| HighAltitudeRightWind | Straight | 31.1° | **133.7** | 154.2 | 37.0 | 7096/0 | -11.6 |
| HighAltitudeRightWind | Pull Straight | 29.6° | **137.5** | 160.4 | 35.0 | 6801/0 | -22.9 |
| HighAltitudeRightWind | Pull Hook | 28.1° | **138.1** | 162.0 | 32.3 | 6352/1408 | -20.4 |
| HighAltitudeRightWind | Pull Slice | 31.1° | **136.1** | 158.4 | 36.9 | 6928/-1536 | -25.7 |
| HighAltitudeRightWind | Push Straight | 32.6° | **129.4** | 147.8 | 39.0 | 7391/0 | -0.8 |
| HighAltitudeRightWind | Push Hook | 31.1° | **130.8** | 149.7 | 36.5 | 6928/1536 | 2.4 |
| HighAltitudeRightWind | Push Slice | 34.1° | **127.4** | 145.5 | 40.8 | 7504/-1664 | -4.2 |
| HighAltitudeRightWind | Straight Hook | 29.6° | **134.5** | 155.9 | 34.4 | 6640/1472 | -8.8 |
| HighAltitudeRightWind | Straight Slice | 32.6° | **131.9** | 151.9 | 38.9 | 7216/-1600 | -14.7 |

---

## Club: PW

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 34.6° | **98.5** | 110.9 | 35.1 | 7700/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 33.1° | **101.3** | 114.7 | 33.9 | 7412/0 | -8.8 |
| SeaLevelNoWind | Pull Hook | 31.6° | **104.2** | 118.8 | 32.4 | 6956/1542 | -6.6 |
| SeaLevelNoWind | Pull Slice | 34.6° | **98.6** | 111.1 | 34.8 | 7517/-1667 | -10.8 |
| SeaLevelNoWind | Push Straight | 36.1° | **95.8** | 107.5 | 36.2 | 7988/0 | 8.4 |
| SeaLevelNoWind | Push Hook | 34.6° | **98.6** | 111.1 | 34.8 | 7517/1667 | 10.8 |
| SeaLevelNoWind | Push Slice | 37.6° | **93.1** | 104.0 | 37.0 | 8079/-1791 | 6.1 |
| SeaLevelNoWind | Straight Hook | 33.1° | **101.3** | 114.8 | 33.7 | 7237/1604 | 2.4 |
| SeaLevelNoWind | Straight Slice | 36.1° | **95.8** | 107.4 | 35.9 | 7798/-1729 | -2.1 |
| SeaLevelBackWind | Straight | 34.6° | **111.7** | 132.6 | 31.7 | 7700/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 33.1° | **113.7** | 135.9 | 30.5 | 7412/0 | -9.0 |
| SeaLevelBackWind | Pull Hook | 31.6° | **115.8** | 139.5 | 29.1 | 6956/1542 | -9.4 |
| SeaLevelBackWind | Pull Slice | 34.6° | **111.5** | 132.4 | 31.5 | 7517/-1667 | -8.4 |
| SeaLevelBackWind | Push Straight | 36.1° | **109.5** | 129.3 | 32.9 | 7988/0 | 8.6 |
| SeaLevelBackWind | Push Hook | 34.6° | **111.5** | 132.4 | 31.5 | 7517/1667 | 8.4 |
| SeaLevelBackWind | Push Slice | 37.6° | **107.4** | 126.4 | 33.9 | 8079/-1791 | 8.8 |
| SeaLevelBackWind | Straight Hook | 33.1° | **113.7** | 135.9 | 30.4 | 7237/1604 | -0.3 |
| SeaLevelBackWind | Straight Slice | 36.1° | **109.6** | 129.5 | 32.8 | 7798/-1729 | 0.4 |
| SeaLevelFrontWind | Straight | 34.6° | **80.9** | 85.8 | 39.0 | 7700/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 33.1° | **84.5** | 90.2 | 38.0 | 7412/0 | -8.7 |
| SeaLevelFrontWind | Pull Hook | 31.6° | **87.9** | 94.5 | 36.4 | 6956/1542 | -3.1 |
| SeaLevelFrontWind | Pull Slice | 34.6° | **81.3** | 86.5 | 38.7 | 7517/-1667 | -13.8 |
| SeaLevelFrontWind | Push Straight | 36.1° | **77.8** | 82.3 | 40.0 | 7988/0 | 8.2 |
| SeaLevelFrontWind | Push Hook | 34.6° | **81.3** | 86.5 | 38.7 | 7517/1667 | 13.8 |
| SeaLevelFrontWind | Push Slice | 37.6° | **74.7** | 78.8 | 40.6 | 8079/-1791 | 2.8 |
| SeaLevelFrontWind | Straight Hook | 33.1° | **84.5** | 90.4 | 37.6 | 7237/1604 | 5.7 |
| SeaLevelFrontWind | Straight Slice | 36.1° | **77.8** | 82.4 | 39.7 | 7798/-1729 | -5.3 |
| SeaLevelLeftWind | Straight | 34.6° | **98.6** | 112.2 | 35.2 | 7700/0 | 12.9 |
| SeaLevelLeftWind | Pull Straight | 33.1° | **100.2** | 114.0 | 34.4 | 7412/0 | 4.1 |
| SeaLevelLeftWind | Pull Hook | 31.6° | **104.7** | 120.5 | 33.5 | 6956/1542 | 6.7 |
| SeaLevelLeftWind | Pull Slice | 34.6° | **96.2** | 108.4 | 34.7 | 7517/-1667 | 2.0 |
| SeaLevelLeftWind | Push Straight | 36.1° | **97.2** | 110.7 | 36.0 | 7988/0 | 21.3 |
| SeaLevelLeftWind | Push Hook | 34.6° | **101.3** | 116.3 | 35.2 | 7517/1667 | 23.9 |
| SeaLevelLeftWind | Push Slice | 37.6° | **93.7** | 105.8 | 36.3 | 8079/-1791 | 19.3 |
| SeaLevelLeftWind | Straight Hook | 33.1° | **102.8** | 118.2 | 34.4 | 7237/1604 | 15.5 |
| SeaLevelLeftWind | Straight Slice | 36.1° | **94.9** | 107.0 | 35.5 | 7798/-1729 | 10.9 |
| SeaLevelRightWind | Straight | 34.6° | **98.6** | 112.2 | 35.2 | 7700/0 | -12.9 |
| SeaLevelRightWind | Pull Straight | 33.1° | **102.8** | 117.9 | 33.8 | 7412/0 | -21.3 |
| SeaLevelRightWind | Pull Hook | 31.6° | **104.3** | 119.7 | 31.8 | 6956/1542 | -18.6 |
| SeaLevelRightWind | Pull Slice | 34.6° | **101.3** | 116.3 | 35.2 | 7517/-1667 | -23.9 |
| SeaLevelRightWind | Push Straight | 36.1° | **94.5** | 106.8 | 36.6 | 7988/0 | -5.1 |
| SeaLevelRightWind | Push Hook | 34.6° | **96.2** | 108.4 | 34.7 | 7517/1667 | -2.0 |
| SeaLevelRightWind | Push Slice | 37.6° | **92.9** | 105.3 | 38.0 | 8079/-1791 | -8.2 |
| SeaLevelRightWind | Straight Hook | 33.1° | **100.3** | 114.0 | 33.3 | 7237/1604 | -10.0 |
| SeaLevelRightWind | Straight Slice | 36.1° | **97.2** | 110.8 | 36.7 | 7798/-1729 | -15.8 |
| HighAltitudeNoWind | Straight | 34.6° | **116.3** | 133.3 | 35.2 | 7700/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 33.1° | **119.1** | 137.4 | 33.8 | 7412/0 | -10.4 |
| HighAltitudeNoWind | Pull Hook | 31.6° | **121.5** | 141.4 | 32.0 | 6956/1542 | -9.6 |
| HighAltitudeNoWind | Pull Slice | 34.6° | **116.1** | 133.3 | 35.0 | 7517/-1667 | -11.0 |
| HighAltitudeNoWind | Push Straight | 36.1° | **113.4** | 129.2 | 36.6 | 7988/0 | 9.9 |
| HighAltitudeNoWind | Push Hook | 34.6° | **116.1** | 133.3 | 35.0 | 7517/1667 | 11.0 |
| HighAltitudeNoWind | Push Slice | 37.6° | **110.3** | 125.0 | 37.7 | 8079/-1791 | 8.9 |
| HighAltitudeNoWind | Straight Hook | 33.1° | **118.9** | 137.4 | 33.5 | 7237/1604 | 1.0 |
| HighAltitudeNoWind | Straight Slice | 36.1° | **113.3** | 129.2 | 36.4 | 7798/-1729 | -0.8 |
| HighAltitudeBackWind | Straight | 34.6° | **125.6** | 151.1 | 32.1 | 7700/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 33.1° | **127.4** | 154.7 | 30.7 | 7412/0 | -10.3 |
| HighAltitudeBackWind | Pull Hook | 31.6° | **129.2** | 158.4 | 29.0 | 6956/1542 | -12.2 |
| HighAltitudeBackWind | Pull Slice | 34.6° | **125.4** | 150.9 | 31.9 | 7517/-1667 | -8.4 |
| HighAltitudeBackWind | Push Straight | 36.1° | **123.3** | 147.2 | 33.5 | 7988/0 | 9.9 |
| HighAltitudeBackWind | Push Hook | 34.6° | **125.4** | 150.9 | 31.9 | 7517/1667 | 8.4 |
| HighAltitudeBackWind | Push Slice | 37.6° | **121.3** | 143.8 | 34.8 | 8079/-1791 | 11.5 |
| HighAltitudeBackWind | Straight Hook | 33.1° | **127.4** | 154.8 | 30.5 | 7237/1604 | -1.7 |
| HighAltitudeBackWind | Straight Slice | 36.1° | **123.5** | 147.4 | 33.4 | 7798/-1729 | 1.7 |
| HighAltitudeFrontWind | Straight | 34.6° | **103.1** | 112.4 | 39.0 | 7700/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 33.1° | **106.6** | 117.1 | 37.6 | 7412/0 | -10.4 |
| HighAltitudeFrontWind | Pull Hook | 31.6° | **109.6** | 121.4 | 35.6 | 6956/1542 | -6.3 |
| HighAltitudeFrontWind | Pull Slice | 34.6° | **103.2** | 112.9 | 38.7 | 7517/-1667 | -14.2 |
| HighAltitudeFrontWind | Push Straight | 36.1° | **99.5** | 107.9 | 40.3 | 7988/0 | 9.8 |
| HighAltitudeFrontWind | Push Hook | 34.6° | **103.2** | 112.9 | 38.7 | 7517/1667 | 14.2 |
| HighAltitudeFrontWind | Push Slice | 37.6° | **95.8** | 103.2 | 41.2 | 8079/-1791 | 5.7 |
| HighAltitudeFrontWind | Straight Hook | 33.1° | **106.5** | 117.1 | 37.2 | 7237/1604 | 4.2 |
| HighAltitudeFrontWind | Straight Slice | 36.1° | **99.4** | 107.9 | 40.0 | 7798/-1729 | -4.0 |
| HighAltitudeLeftWind | Straight | 34.6° | **116.4** | 134.1 | 35.4 | 7700/0 | 10.8 |
| HighAltitudeLeftWind | Pull Straight | 33.1° | **118.3** | 136.6 | 34.3 | 7412/0 | 0.3 |
| HighAltitudeLeftWind | Pull Hook | 31.6° | **122.3** | 142.8 | 33.0 | 6956/1542 | 1.4 |
| HighAltitudeLeftWind | Pull Slice | 34.6° | **114.2** | 130.6 | 34.9 | 7517/-1667 | -0.4 |
| HighAltitudeLeftWind | Push Straight | 36.1° | **114.5** | 131.6 | 36.5 | 7988/0 | 20.8 |
| HighAltitudeLeftWind | Push Hook | 34.6° | **118.6** | 137.6 | 35.4 | 7517/1667 | 22.0 |
| HighAltitudeLeftWind | Push Slice | 37.6° | **110.5** | 126.0 | 37.1 | 8079/-1791 | 20.1 |
| HighAltitudeLeftWind | Straight Hook | 33.1° | **120.4** | 140.1 | 34.2 | 7237/1604 | 12.0 |
| HighAltitudeLeftWind | Straight Slice | 36.1° | **112.3** | 128.3 | 36.0 | 7798/-1729 | 10.1 |
| HighAltitudeRightWind | Straight | 34.6° | **116.4** | 134.1 | 35.4 | 7700/0 | -10.8 |
| HighAltitudeRightWind | Pull Straight | 33.1° | **120.1** | 139.6 | 33.7 | 7412/0 | -20.7 |
| HighAltitudeRightWind | Pull Hook | 31.6° | **121.0** | 141.5 | 31.4 | 6956/1542 | -19.4 |
| HighAltitudeRightWind | Pull Slice | 34.6° | **118.6** | 137.6 | 35.4 | 7517/-1667 | -22.0 |
| HighAltitudeRightWind | Push Straight | 36.1° | **112.4** | 128.3 | 37.1 | 7988/0 | -1.4 |
| HighAltitudeRightWind | Push Hook | 34.6° | **114.2** | 130.6 | 34.9 | 7517/1667 | 0.4 |
| HighAltitudeRightWind | Push Slice | 37.6° | **110.5** | 126.0 | 38.7 | 8079/-1791 | -3.4 |
| HighAltitudeRightWind | Straight Hook | 33.1° | **117.7** | 136.0 | 33.2 | 7237/1604 | -9.3 |
| HighAltitudeRightWind | Straight Slice | 36.1° | **114.6** | 131.8 | 37.1 | 7798/-1729 | -12.5 |

---

## Club: SW

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 42.9° | **72.9** | 81.7 | 30.8 | 9017/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 41.4° | **75.0** | 84.4 | 29.9 | 8741/0 | -6.5 |
| SeaLevelNoWind | Pull Hook | 39.9° | **77.0** | 87.2 | 29.0 | 8264/1832 | -6.4 |
| SeaLevelNoWind | Pull Slice | 42.9° | **72.9** | 81.6 | 30.7 | 8804/-1952 | -6.6 |
| SeaLevelNoWind | Push Straight | 44.4° | **70.8** | 78.8 | 31.6 | 9294/0 | 6.2 |
| SeaLevelNoWind | Push Hook | 42.9° | **72.9** | 81.6 | 30.7 | 8804/1952 | 6.6 |
| SeaLevelNoWind | Push Slice | 45.9° | **68.6** | 76.0 | 32.2 | 9344/-2071 | 5.8 |
| SeaLevelNoWind | Straight Hook | 41.4° | **75.0** | 84.5 | 29.8 | 8534/1892 | 0.3 |
| SeaLevelNoWind | Straight Slice | 44.4° | **70.8** | 78.9 | 31.5 | 9074/-2012 | -0.2 |
| SeaLevelBackWind | Straight | 42.9° | **84.5** | 100.7 | 28.5 | 9017/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 41.4° | **86.1** | 103.1 | 27.6 | 8741/0 | -6.7 |
| SeaLevelBackWind | Pull Hook | 39.9° | **87.7** | 105.6 | 26.7 | 8264/1832 | -8.5 |
| SeaLevelBackWind | Pull Slice | 42.9° | **84.4** | 100.6 | 28.5 | 8804/-1952 | -4.9 |
| SeaLevelBackWind | Push Straight | 44.4° | **82.5** | 97.9 | 29.4 | 9294/0 | 6.4 |
| SeaLevelBackWind | Push Hook | 42.9° | **84.4** | 100.6 | 28.5 | 8804/1952 | 4.9 |
| SeaLevelBackWind | Push Slice | 45.9° | **80.7** | 95.3 | 30.3 | 9344/-2071 | 7.9 |
| SeaLevelBackWind | Straight Hook | 41.4° | **86.1** | 103.2 | 27.6 | 8534/1892 | -1.6 |
| SeaLevelBackWind | Straight Slice | 44.4° | **82.7** | 98.2 | 29.4 | 9074/-2012 | 1.6 |
| SeaLevelFrontWind | Straight | 42.9° | **58.0** | 61.0 | 33.6 | 9017/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 41.4° | **60.5** | 63.9 | 32.9 | 8741/0 | -6.4 |
| SeaLevelFrontWind | Pull Hook | 39.9° | **62.9** | 66.6 | 31.8 | 8264/1832 | -3.8 |
| SeaLevelFrontWind | Pull Slice | 42.9° | **58.2** | 61.4 | 33.5 | 8804/-1952 | -8.8 |
| SeaLevelFrontWind | Push Straight | 44.4° | **55.6** | 58.3 | 34.3 | 9294/0 | 6.0 |
| SeaLevelFrontWind | Push Hook | 42.9° | **58.2** | 61.4 | 33.5 | 8804/1952 | 8.8 |
| SeaLevelFrontWind | Push Slice | 45.9° | **53.2** | 55.6 | 34.8 | 9344/-2071 | 3.3 |
| SeaLevelFrontWind | Straight Hook | 41.4° | **60.5** | 63.9 | 32.7 | 8534/1892 | 2.7 |
| SeaLevelFrontWind | Straight Slice | 44.4° | **55.6** | 58.3 | 34.1 | 9074/-2012 | -2.6 |
| SeaLevelLeftWind | Straight | 42.9° | **73.0** | 82.8 | 30.9 | 9017/0 | 10.7 |
| SeaLevelLeftWind | Pull Straight | 41.4° | **74.0** | 83.9 | 30.3 | 8741/0 | 4.2 |
| SeaLevelLeftWind | Pull Hook | 39.9° | **76.9** | 88.0 | 29.8 | 8264/1832 | 4.8 |
| SeaLevelLeftWind | Pull Slice | 42.9° | **71.3** | 80.0 | 30.6 | 8804/-1952 | 4.0 |
| SeaLevelLeftWind | Push Straight | 44.4° | **71.9** | 81.6 | 31.5 | 9294/0 | 16.8 |
| SeaLevelLeftWind | Push Hook | 42.9° | **74.7** | 85.5 | 31.0 | 8804/1952 | 17.4 |
| SeaLevelLeftWind | Push Slice | 45.9° | **69.4** | 78.1 | 31.7 | 9344/-2071 | 16.5 |
| SeaLevelLeftWind | Straight Hook | 41.4° | **75.9** | 86.8 | 30.4 | 8534/1892 | 11.3 |
| SeaLevelLeftWind | Straight Slice | 44.4° | **70.4** | 79.1 | 31.2 | 9074/-2012 | 10.4 |
| SeaLevelRightWind | Straight | 42.9° | **73.0** | 82.8 | 30.9 | 9017/0 | -10.7 |
| SeaLevelRightWind | Pull Straight | 41.4° | **76.2** | 87.2 | 29.9 | 8741/0 | -16.9 |
| SeaLevelRightWind | Pull Hook | 39.9° | **77.5** | 88.8 | 28.5 | 8264/1832 | -16.5 |
| SeaLevelRightWind | Pull Slice | 42.9° | **74.7** | 85.5 | 31.0 | 8804/-1952 | -17.4 |
| SeaLevelRightWind | Push Straight | 44.4° | **69.7** | 78.3 | 31.9 | 9294/0 | -4.9 |
| SeaLevelRightWind | Push Hook | 42.9° | **71.3** | 80.0 | 30.6 | 8804/1952 | -4.0 |
| SeaLevelRightWind | Push Slice | 45.9° | **68.0** | 76.5 | 32.9 | 9344/-2071 | -5.9 |
| SeaLevelRightWind | Straight Hook | 41.4° | **74.4** | 84.4 | 29.5 | 8534/1892 | -10.1 |
| SeaLevelRightWind | Straight Slice | 44.4° | **71.5** | 81.1 | 32.0 | 9074/-2012 | -11.4 |
| HighAltitudeNoWind | Straight | 42.9° | **84.7** | 96.4 | 31.6 | 9017/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 41.4° | **86.8** | 99.4 | 30.6 | 8741/0 | -7.6 |
| HighAltitudeNoWind | Pull Hook | 39.9° | **88.8** | 102.5 | 29.4 | 8264/1832 | -8.5 |
| HighAltitudeNoWind | Pull Slice | 42.9° | **84.7** | 96.5 | 31.5 | 8804/-1952 | -6.6 |
| HighAltitudeNoWind | Push Straight | 44.4° | **82.5** | 93.4 | 32.6 | 9294/0 | 7.2 |
| HighAltitudeNoWind | Push Hook | 42.9° | **84.7** | 96.5 | 31.5 | 8804/1952 | 6.6 |
| HighAltitudeNoWind | Push Slice | 45.9° | **80.3** | 90.3 | 33.4 | 9344/-2071 | 7.8 |
| HighAltitudeNoWind | Straight Hook | 41.4° | **86.9** | 99.5 | 30.5 | 8534/1892 | -0.8 |
| HighAltitudeNoWind | Straight Slice | 44.4° | **82.5** | 93.3 | 32.5 | 9074/-2012 | 0.8 |
| HighAltitudeBackWind | Straight | 42.9° | **93.9** | 112.5 | 29.5 | 9017/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 41.4° | **95.5** | 115.1 | 28.5 | 8741/0 | -7.7 |
| HighAltitudeBackWind | Pull Hook | 39.9° | **97.0** | 117.7 | 27.3 | 8264/1832 | -10.5 |
| HighAltitudeBackWind | Pull Slice | 42.9° | **93.8** | 112.5 | 29.5 | 8804/-1952 | -4.9 |
| HighAltitudeBackWind | Push Straight | 44.4° | **92.1** | 109.8 | 30.6 | 9294/0 | 7.4 |
| HighAltitudeBackWind | Push Hook | 42.9° | **93.8** | 112.5 | 29.5 | 8804/1952 | 4.9 |
| HighAltitudeBackWind | Push Slice | 45.9° | **90.3** | 107.0 | 31.6 | 9344/-2071 | 9.7 |
| HighAltitudeBackWind | Straight Hook | 41.4° | **95.5** | 115.2 | 28.4 | 8534/1892 | -2.6 |
| HighAltitudeBackWind | Straight Slice | 44.4° | **92.1** | 109.8 | 30.5 | 9074/-2012 | 2.6 |
| HighAltitudeFrontWind | Straight | 42.9° | **72.7** | 77.9 | 34.3 | 9017/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 41.4° | **75.5** | 81.2 | 33.4 | 8741/0 | -7.5 |
| HighAltitudeFrontWind | Pull Hook | 39.9° | **78.2** | 84.9 | 32.1 | 8264/1832 | -6.1 |
| HighAltitudeFrontWind | Pull Slice | 42.9° | **72.9** | 78.2 | 34.1 | 8804/-1952 | -8.8 |
| HighAltitudeFrontWind | Push Straight | 44.4° | **70.1** | 74.9 | 35.2 | 9294/0 | 7.1 |
| HighAltitudeFrontWind | Push Hook | 42.9° | **72.9** | 78.2 | 34.1 | 8804/1952 | 8.8 |
| HighAltitudeFrontWind | Push Slice | 45.9° | **67.5** | 71.8 | 35.9 | 9344/-2071 | 5.5 |
| HighAltitudeFrontWind | Straight Hook | 41.4° | **75.4** | 81.2 | 33.2 | 8534/1892 | 1.5 |
| HighAltitudeFrontWind | Straight Slice | 44.4° | **70.1** | 74.9 | 35.0 | 9074/-2012 | -1.4 |
| HighAltitudeLeftWind | Straight | 42.9° | **84.7** | 97.0 | 31.8 | 9017/0 | 9.1 |
| HighAltitudeLeftWind | Pull Straight | 41.4° | **86.0** | 98.6 | 31.0 | 8741/0 | 1.5 |
| HighAltitudeLeftWind | Pull Hook | 39.9° | **89.0** | 103.0 | 30.2 | 8264/1832 | 0.9 |
| HighAltitudeLeftWind | Pull Slice | 42.9° | **83.2** | 94.6 | 31.5 | 8804/-1952 | 2.5 |
| HighAltitudeLeftWind | Push Straight | 44.4° | **83.5** | 95.5 | 32.5 | 9294/0 | 16.3 |
| HighAltitudeLeftWind | Push Hook | 42.9° | **86.2** | 99.5 | 31.8 | 8804/1952 | 15.9 |
| HighAltitudeLeftWind | Push Slice | 45.9° | **80.8** | 91.7 | 33.0 | 9344/-2071 | 17.1 |
| HighAltitudeLeftWind | Straight Hook | 41.4° | **87.6** | 101.2 | 31.0 | 8534/1892 | 8.6 |
| HighAltitudeLeftWind | Straight Slice | 44.4° | **82.0** | 93.1 | 32.2 | 9074/-2012 | 10.0 |
| HighAltitudeRightWind | Straight | 42.9° | **84.7** | 97.0 | 31.8 | 9017/0 | -9.1 |
| HighAltitudeRightWind | Pull Straight | 41.4° | **87.7** | 101.4 | 30.5 | 8741/0 | -16.3 |
| HighAltitudeRightWind | Pull Hook | 39.9° | **89.0** | 103.4 | 29.0 | 8264/1832 | -17.1 |
| HighAltitudeRightWind | Pull Slice | 42.9° | **86.2** | 99.5 | 31.8 | 8804/-1952 | -15.9 |
| HighAltitudeRightWind | Push Straight | 44.4° | **81.5** | 92.4 | 32.9 | 9294/0 | -2.3 |
| HighAltitudeRightWind | Push Hook | 42.9° | **83.2** | 94.6 | 31.5 | 8804/1952 | -2.5 |
| HighAltitudeRightWind | Push Slice | 45.9° | **79.8** | 90.3 | 34.1 | 9344/-2071 | -2.4 |
| HighAltitudeRightWind | Straight Hook | 41.4° | **86.2** | 99.0 | 30.3 | 8534/1892 | -9.6 |
| HighAltitudeRightWind | Straight Slice | 44.4° | **83.1** | 94.9 | 33.0 | 9074/-2012 | -8.9 |

---

## Club: LW

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 46.3° | **61.7** | 69.2 | 27.2 | 9259/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 44.8° | **63.5** | 71.7 | 26.5 | 8993/0 | -5.5 |
| SeaLevelNoWind | Pull Hook | 43.3° | **65.2** | 74.2 | 25.6 | 8521/1889 | -6.1 |
| SeaLevelNoWind | Pull Slice | 46.3° | **61.6** | 69.2 | 27.1 | 9039/-2004 | -5.0 |
| SeaLevelNoWind | Push Straight | 47.8° | **59.8** | 66.6 | 27.9 | 9524/0 | 5.2 |
| SeaLevelNoWind | Push Hook | 46.3° | **61.6** | 69.2 | 27.1 | 9039/2004 | 5.0 |
| SeaLevelNoWind | Push Slice | 49.3° | **57.9** | 64.1 | 28.5 | 9558/-2119 | 5.5 |
| SeaLevelNoWind | Straight Hook | 44.8° | **63.5** | 71.7 | 26.4 | 8780/1946 | -0.4 |
| SeaLevelNoWind | Straight Slice | 47.8° | **59.8** | 66.7 | 27.8 | 9298/-2061 | 0.4 |
| SeaLevelBackWind | Straight | 46.3° | **71.5** | 86.0 | 25.5 | 9259/0 | 0.0 |
| SeaLevelBackWind | Pull Straight | 44.8° | **72.9** | 88.2 | 24.7 | 8993/0 | -5.7 |
| SeaLevelBackWind | Pull Hook | 43.3° | **74.4** | 90.6 | 23.9 | 8521/1889 | -7.8 |
| SeaLevelBackWind | Pull Slice | 46.3° | **71.4** | 85.9 | 25.4 | 9039/-2004 | -3.6 |
| SeaLevelBackWind | Push Straight | 47.8° | **69.8** | 83.4 | 26.2 | 9524/0 | 5.4 |
| SeaLevelBackWind | Push Hook | 46.3° | **71.4** | 85.9 | 25.4 | 9039/2004 | 3.6 |
| SeaLevelBackWind | Push Slice | 49.3° | **68.1** | 81.0 | 26.9 | 9558/-2119 | 7.2 |
| SeaLevelBackWind | Straight Hook | 44.8° | **73.1** | 88.4 | 24.6 | 8780/1946 | -2.0 |
| SeaLevelBackWind | Straight Slice | 47.8° | **69.9** | 83.6 | 26.2 | 9298/-2061 | 2.0 |
| SeaLevelFrontWind | Straight | 46.3° | **48.9** | 51.3 | 29.5 | 9259/0 | 0.0 |
| SeaLevelFrontWind | Pull Straight | 44.8° | **51.1** | 53.9 | 28.8 | 8993/0 | -5.4 |
| SeaLevelFrontWind | Pull Hook | 43.3° | **53.1** | 56.2 | 27.9 | 8521/1889 | -3.9 |
| SeaLevelFrontWind | Pull Slice | 46.3° | **49.0** | 51.6 | 29.3 | 9039/-2004 | -6.8 |
| SeaLevelFrontWind | Push Straight | 47.8° | **46.8** | 49.0 | 30.0 | 9524/0 | 5.1 |
| SeaLevelFrontWind | Push Hook | 46.3° | **49.0** | 51.6 | 29.3 | 9039/2004 | 6.8 |
| SeaLevelFrontWind | Push Slice | 49.3° | **44.6** | 46.5 | 30.5 | 9558/-2119 | 3.4 |
| SeaLevelFrontWind | Straight Hook | 44.8° | **51.0** | 53.9 | 28.7 | 8780/1946 | 1.6 |
| SeaLevelFrontWind | Straight Slice | 47.8° | **46.8** | 49.0 | 29.9 | 9298/-2061 | -1.6 |
| SeaLevelLeftWind | Straight | 46.3° | **61.6** | 70.1 | 27.3 | 9259/0 | 9.1 |
| SeaLevelLeftWind | Pull Straight | 44.8° | **62.5** | 71.1 | 26.7 | 8993/0 | 3.6 |
| SeaLevelLeftWind | Pull Hook | 43.3° | **65.0** | 74.6 | 26.3 | 8521/1889 | 3.5 |
| SeaLevelLeftWind | Pull Slice | 46.3° | **60.3** | 67.8 | 27.0 | 9039/-2004 | 4.1 |
| SeaLevelLeftWind | Push Straight | 47.8° | **60.6** | 69.0 | 27.8 | 9524/0 | 14.2 |
| SeaLevelLeftWind | Push Hook | 46.3° | **63.0** | 72.3 | 27.4 | 9039/2004 | 14.1 |
| SeaLevelLeftWind | Push Slice | 49.3° | **58.5** | 65.9 | 28.1 | 9558/-2119 | 14.5 |
| SeaLevelLeftWind | Straight Hook | 44.8° | **64.1** | 73.6 | 26.8 | 8780/1946 | 9.0 |
| SeaLevelLeftWind | Straight Slice | 47.8° | **59.5** | 67.0 | 27.5 | 9298/-2061 | 9.5 |
| SeaLevelRightWind | Straight | 46.3° | **61.6** | 70.1 | 27.3 | 9259/0 | -9.1 |
| SeaLevelRightWind | Pull Straight | 44.8° | **64.4** | 74.0 | 26.4 | 8993/0 | -14.3 |
| SeaLevelRightWind | Pull Hook | 43.3° | **65.7** | 75.7 | 25.2 | 8521/1889 | -14.7 |
| SeaLevelRightWind | Pull Slice | 46.3° | **63.0** | 72.3 | 27.4 | 9039/-2004 | -14.1 |
| SeaLevelRightWind | Push Straight | 47.8° | **58.7** | 66.0 | 28.1 | 9524/0 | -4.2 |
| SeaLevelRightWind | Push Hook | 46.3° | **60.3** | 67.8 | 27.0 | 9039/2004 | -4.1 |
| SeaLevelRightWind | Push Slice | 49.3° | **57.2** | 64.2 | 29.0 | 9558/-2119 | -4.5 |
| SeaLevelRightWind | Straight Hook | 44.8° | **63.0** | 71.8 | 26.1 | 8780/1946 | -9.2 |
| SeaLevelRightWind | Straight Slice | 47.8° | **60.2** | 68.4 | 28.2 | 9298/-2061 | -9.2 |
| HighAltitudeNoWind | Straight | 46.3° | **70.8** | 80.8 | 28.0 | 9259/0 | 0.0 |
| HighAltitudeNoWind | Pull Straight | 44.8° | **72.7** | 83.6 | 27.1 | 8993/0 | -6.3 |
| HighAltitudeNoWind | Pull Hook | 43.3° | **74.4** | 86.3 | 26.2 | 8521/1889 | -7.8 |
| HighAltitudeNoWind | Pull Slice | 46.3° | **70.8** | 80.9 | 27.9 | 9039/-2004 | -4.8 |
| HighAltitudeNoWind | Push Straight | 47.8° | **68.9** | 78.1 | 28.8 | 9524/0 | 6.0 |
| HighAltitudeNoWind | Push Hook | 46.3° | **70.8** | 80.9 | 27.9 | 9039/2004 | 4.8 |
| HighAltitudeNoWind | Push Slice | 49.3° | **66.9** | 75.3 | 29.6 | 9558/-2119 | 7.1 |
| HighAltitudeNoWind | Straight Hook | 44.8° | **72.7** | 83.6 | 27.1 | 8780/1946 | -1.3 |
| HighAltitudeNoWind | Straight Slice | 47.8° | **68.9** | 78.2 | 28.7 | 9298/-2061 | 1.3 |
| HighAltitudeBackWind | Straight | 46.3° | **78.7** | 95.1 | 26.4 | 9259/0 | 0.0 |
| HighAltitudeBackWind | Pull Straight | 44.8° | **80.1** | 97.4 | 25.5 | 8993/0 | -6.4 |
| HighAltitudeBackWind | Pull Hook | 43.3° | **81.5** | 99.9 | 24.6 | 8521/1889 | -9.4 |
| HighAltitudeBackWind | Pull Slice | 46.3° | **78.6** | 95.0 | 26.4 | 9039/-2004 | -3.5 |
| HighAltitudeBackWind | Push Straight | 47.8° | **77.2** | 92.6 | 27.3 | 9524/0 | 6.2 |
| HighAltitudeBackWind | Push Hook | 46.3° | **78.6** | 95.0 | 26.4 | 9039/2004 | 3.5 |
| HighAltitudeBackWind | Push Slice | 49.3° | **75.3** | 89.8 | 28.1 | 9558/-2119 | 8.7 |
| HighAltitudeBackWind | Straight Hook | 44.8° | **80.2** | 97.6 | 25.5 | 8780/1946 | -2.8 |
| HighAltitudeBackWind | Straight Slice | 47.8° | **77.1** | 92.6 | 27.3 | 9298/-2061 | 2.8 |
| HighAltitudeFrontWind | Straight | 46.3° | **60.5** | 64.9 | 30.1 | 9259/0 | 0.0 |
| HighAltitudeFrontWind | Pull Straight | 44.8° | **62.8** | 67.7 | 29.3 | 8993/0 | -6.2 |
| HighAltitudeFrontWind | Pull Hook | 43.3° | **65.0** | 70.3 | 28.3 | 8521/1889 | -5.9 |
| HighAltitudeFrontWind | Pull Slice | 46.3° | **60.6** | 65.1 | 30.0 | 9039/-2004 | -6.6 |
| HighAltitudeFrontWind | Push Straight | 47.8° | **58.3** | 62.3 | 30.9 | 9524/0 | 5.9 |
| HighAltitudeFrontWind | Push Hook | 46.3° | **60.6** | 65.1 | 30.0 | 9039/2004 | 6.6 |
| HighAltitudeFrontWind | Push Slice | 49.3° | **55.9** | 59.5 | 31.5 | 9558/-2119 | 5.2 |
| HighAltitudeFrontWind | Straight Hook | 44.8° | **62.8** | 67.7 | 29.2 | 8780/1946 | 0.6 |
| HighAltitudeFrontWind | Straight Slice | 47.8° | **58.2** | 62.2 | 30.7 | 9298/-2061 | -0.5 |
| HighAltitudeLeftWind | Straight | 46.3° | **70.7** | 81.3 | 28.1 | 9259/0 | 7.7 |
| HighAltitudeLeftWind | Pull Straight | 44.8° | **71.8** | 82.7 | 27.4 | 8993/0 | 1.4 |
| HighAltitudeLeftWind | Pull Hook | 43.3° | **74.2** | 86.3 | 26.8 | 8521/1889 | 0.2 |
| HighAltitudeLeftWind | Pull Slice | 46.3° | **69.5** | 79.3 | 27.9 | 9039/-2004 | 2.8 |
| HighAltitudeLeftWind | Push Straight | 47.8° | **69.6** | 79.9 | 28.8 | 9524/0 | 13.7 |
| HighAltitudeLeftWind | Push Hook | 46.3° | **72.0** | 83.4 | 28.2 | 9039/2004 | 12.7 |
| HighAltitudeLeftWind | Push Slice | 49.3° | **67.3** | 76.6 | 29.2 | 9558/-2119 | 14.8 |
| HighAltitudeLeftWind | Straight Hook | 44.8° | **73.2** | 84.9 | 27.5 | 8780/1946 | 6.7 |
| HighAltitudeLeftWind | Straight Slice | 47.8° | **68.4** | 77.9 | 28.6 | 9298/-2061 | 9.0 |
| HighAltitudeRightWind | Straight | 46.3° | **70.7** | 81.3 | 28.1 | 9259/0 | -7.7 |
| HighAltitudeRightWind | Pull Straight | 44.8° | **73.3** | 85.3 | 27.1 | 8993/0 | -13.8 |
| HighAltitudeRightWind | Pull Hook | 43.3° | **74.6** | 87.2 | 25.8 | 8521/1889 | -15.1 |
| HighAltitudeRightWind | Pull Slice | 46.3° | **72.0** | 83.4 | 28.2 | 9039/-2004 | -12.7 |
| HighAltitudeRightWind | Push Straight | 47.8° | **68.0** | 77.3 | 29.1 | 9524/0 | -2.0 |
| HighAltitudeRightWind | Push Hook | 46.3° | **69.5** | 79.3 | 27.9 | 9039/2004 | -2.8 |
| HighAltitudeRightWind | Push Slice | 49.3° | **66.3** | 75.1 | 30.1 | 9558/-2119 | -1.5 |
| HighAltitudeRightWind | Straight Hook | 44.8° | **72.1** | 83.3 | 26.9 | 8780/1946 | -8.7 |
| HighAltitudeRightWind | Straight Slice | 47.8° | **69.2** | 79.2 | 29.1 | 9298/-2061 | -6.9 |

---

