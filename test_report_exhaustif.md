# Rapport de Test Physique Exhaustif - V11 (Trackman Grade)

Ce rapport présente les résultats détaillés de la simulation pour chaque club, scénario météo et type de coup.

> [!NOTE]
> **Moteur Physique V11 (Trackman Grade)** : Précision CREPS, Reynolds Number Approximation, Spin Decay (4%/s) et iron Trajectory Flattening.
> **Vitesse Club** : Variable selon le club (Dr: 105 MPH ... LW: 72 MPH).
> **Vent** : Variable (10, 20 m/s) pour les tests venteux.

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
- **LW**: Speed 72 MPH, Loft 58°, Smash 1, AoA -6°

---

## Club: Dr

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 10.4° | **227.0** | 246.9 | 23.9 | 1917/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 8.9° | **212.0** | 235.2 | 17.8 | 1530/0 | -18.5 |
| SeaLevelNoWind | Pull Hook | 7.4° | **189.8** | 217.8 | 11.9 | 1115/-247 | -40.7 |
| SeaLevelNoWind | Pull Slice | 10.4° | **224.6** | 244.8 | 23.2 | 1871/415 | 15.6 |
| SeaLevelNoWind | Push Straight | 11.9° | **237.6** | 255.0 | 30.6 | 2304/0 | 20.7 |
| SeaLevelNoWind | Push Hook | 10.4° | **224.6** | 244.8 | 23.2 | 1871/-415 | -15.6 |
| SeaLevelNoWind | Push Slice | 13.4° | **242.1** | 257.9 | 36.4 | 2628/583 | 65.1 |
| SeaLevelNoWind | Straight Hook | 8.9° | **209.5** | 233.1 | 17.2 | 1493/-331 | -29.8 |
| SeaLevelNoWind | Straight Slice | 11.9° | **235.2** | 252.9 | 29.7 | 2250/499 | 40.1 |
| SeaLevelBackWind_10ms | Straight | 10.4° | **232.2** | 255.4 | 22.4 | 1917/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 8.9° | **214.9** | 241.5 | 16.5 | 1530/0 | -18.3 |
| SeaLevelBackWind_10ms | Pull Hook | 7.4° | **189.9** | 221.3 | 11.0 | 1115/-247 | -39.0 |
| SeaLevelBackWind_10ms | Pull Slice | 10.4° | **229.4** | 252.9 | 21.7 | 1871/415 | 14.1 |
| SeaLevelBackWind_10ms | Push Straight | 11.9° | **244.9** | 265.4 | 28.7 | 2304/0 | 20.7 |
| SeaLevelBackWind_10ms | Push Hook | 10.4° | **229.4** | 252.9 | 21.7 | 1871/-415 | -14.1 |
| SeaLevelBackWind_10ms | Push Slice | 13.4° | **250.6** | 269.3 | 34.4 | 2628/583 | 63.1 |
| SeaLevelBackWind_10ms | Straight Hook | 8.9° | **212.0** | 239.0 | 16.0 | 1493/-331 | -28.2 |
| SeaLevelBackWind_10ms | Straight Slice | 11.9° | **242.2** | 263.0 | 27.9 | 2250/499 | 38.3 |
| SeaLevelBackWind_20ms | Straight | 10.4° | **235.7** | 262.3 | 20.9 | 1917/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 8.9° | **216.2** | 246.3 | 15.3 | 1530/0 | -18.0 |
| SeaLevelBackWind_20ms | Pull Hook | 7.4° | **189.2** | 223.9 | 10.2 | 1115/-247 | -37.3 |
| SeaLevelBackWind_20ms | Pull Slice | 10.4° | **232.9** | 259.7 | 20.3 | 1871/415 | 12.6 |
| SeaLevelBackWind_20ms | Push Straight | 11.9° | **250.7** | 274.5 | 26.9 | 2304/0 | 20.6 |
| SeaLevelBackWind_20ms | Push Hook | 10.4° | **232.9** | 259.7 | 20.3 | 1871/-415 | -12.6 |
| SeaLevelBackWind_20ms | Push Slice | 13.4° | **257.8** | 279.5 | 32.4 | 2628/583 | 61.2 |
| SeaLevelBackWind_20ms | Straight Hook | 8.9° | **213.2** | 243.6 | 14.9 | 1493/-331 | -26.7 |
| SeaLevelBackWind_20ms | Straight Slice | 11.9° | **247.6** | 271.5 | 26.2 | 2250/499 | 36.4 |
| SeaLevelFrontWind_10ms | Straight | 10.4° | **220.4** | 237.0 | 25.6 | 1917/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 8.9° | **208.0** | 227.8 | 19.1 | 1530/0 | -18.7 |
| SeaLevelFrontWind_10ms | Pull Hook | 7.4° | **188.6** | 213.1 | 12.9 | 1115/-247 | -42.3 |
| SeaLevelFrontWind_10ms | Pull Slice | 10.4° | **218.3** | 235.4 | 24.8 | 1871/415 | 17.3 |
| SeaLevelFrontWind_10ms | Push Straight | 11.9° | **228.6** | 243.0 | 32.5 | 2304/0 | 20.7 |
| SeaLevelFrontWind_10ms | Push Hook | 10.4° | **218.3** | 235.4 | 24.8 | 1871/-415 | -17.3 |
| SeaLevelFrontWind_10ms | Push Slice | 13.4° | **232.0** | 245.2 | 38.6 | 2628/583 | 66.9 |
| SeaLevelFrontWind_10ms | Straight Hook | 8.9° | **205.7** | 226.0 | 18.5 | 1493/-331 | -31.4 |
| SeaLevelFrontWind_10ms | Straight Slice | 11.9° | **226.8** | 241.6 | 31.6 | 2250/499 | 41.9 |
| SeaLevelFrontWind_20ms | Straight | 10.4° | **212.3** | 225.8 | 27.3 | 1917/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 8.9° | **202.4** | 218.9 | 20.5 | 1530/0 | -18.8 |
| SeaLevelFrontWind_20ms | Pull Hook | 7.4° | **185.9** | 207.1 | 13.9 | 1115/-247 | -43.9 |
| SeaLevelFrontWind_20ms | Pull Slice | 10.4° | **210.3** | 224.3 | 26.4 | 1871/415 | 18.8 |
| SeaLevelFrontWind_20ms | Push Straight | 11.9° | **218.2** | 229.7 | 34.5 | 2304/0 | 20.7 |
| SeaLevelFrontWind_20ms | Push Hook | 10.4° | **210.3** | 224.3 | 26.4 | 1871/-415 | -18.8 |
| SeaLevelFrontWind_20ms | Push Slice | 13.4° | **220.4** | 231.1 | 40.7 | 2628/583 | 68.7 |
| SeaLevelFrontWind_20ms | Straight Hook | 8.9° | **200.4** | 217.4 | 19.8 | 1493/-331 | -32.9 |
| SeaLevelFrontWind_20ms | Straight Slice | 11.9° | **216.9** | 228.9 | 33.5 | 2250/499 | 43.7 |
| SeaLevelSideWind_10ms | Straight | 10.4° | **227.0** | 246.9 | 24.0 | 1917/0 | 7.2 |
| SeaLevelSideWind_10ms | Pull Straight | 8.9° | **212.0** | 234.9 | 17.9 | 1530/0 | -12.6 |
| SeaLevelSideWind_10ms | Pull Hook | 7.4° | **188.9** | 216.1 | 12.1 | 1115/-247 | -36.4 |
| SeaLevelSideWind_10ms | Pull Slice | 10.4° | **226.0** | 246.7 | 23.3 | 1871/415 | 22.8 |
| SeaLevelSideWind_10ms | Push Straight | 11.9° | **238.3** | 256.1 | 30.5 | 2304/0 | 29.1 |
| SeaLevelSideWind_10ms | Push Hook | 10.4° | **223.4** | 243.2 | 23.1 | 1871/-415 | -8.6 |
| SeaLevelSideWind_10ms | Push Slice | 13.4° | **245.8** | 262.8 | 36.3 | 2628/583 | 74.4 |
| SeaLevelSideWind_10ms | Straight Hook | 8.9° | **208.4** | 231.4 | 17.3 | 1493/-331 | -24.2 |
| SeaLevelSideWind_10ms | Straight Slice | 11.9° | **237.6** | 256.2 | 29.7 | 2250/499 | 48.4 |
| SeaLevelSideWind_20ms | Straight | 10.4° | **227.6** | 247.6 | 24.1 | 1917/0 | -14.5 |
| SeaLevelSideWind_20ms | Pull Straight | 8.9° | **213.1** | 237.0 | 17.7 | 1530/0 | -30.0 |
| SeaLevelSideWind_20ms | Pull Hook | 7.4° | **191.7** | 221.5 | 11.7 | 1115/-247 | -48.9 |
| SeaLevelSideWind_20ms | Pull Slice | 10.4° | **222.3** | 241.9 | 23.1 | 1871/415 | 1.6 |
| SeaLevelSideWind_20ms | Push Straight | 11.9° | **236.5** | 253.7 | 31.1 | 2304/0 | 3.5 |
| SeaLevelSideWind_20ms | Push Hook | 10.4° | **227.7** | 249.1 | 23.5 | 1871/-415 | -30.1 |
| SeaLevelSideWind_20ms | Push Slice | 13.4° | **234.9** | 248.9 | 37.0 | 2628/583 | 46.0 |
| SeaLevelSideWind_20ms | Straight Hook | 8.9° | **212.5** | 237.5 | 17.2 | 1493/-331 | -41.2 |
| SeaLevelSideWind_20ms | Straight Slice | 11.9° | **230.9** | 247.4 | 29.9 | 2250/499 | 23.5 |
| HighAltitude_NoWind | Straight | 10.4° | **238.8** | 266.2 | 19.7 | 1917/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 8.9° | **217.7** | 249.2 | 14.3 | 1530/0 | -19.0 |
| HighAltitude_NoWind | Pull Hook | 7.4° | **189.3** | 226.2 | 9.4 | 1115/-247 | -37.7 |
| HighAltitude_NoWind | Pull Slice | 10.4° | **235.9** | 263.7 | 19.1 | 1871/415 | 11.4 |
| HighAltitude_NoWind | Push Straight | 11.9° | **255.9** | 279.9 | 25.7 | 2304/0 | 22.3 |
| HighAltitude_NoWind | Push Hook | 10.4° | **235.9** | 263.7 | 19.1 | 1871/-415 | -11.4 |
| HighAltitude_NoWind | Push Slice | 13.4° | **265.9** | 287.6 | 31.4 | 2628/583 | 64.8 |
| HighAltitude_NoWind | Straight Hook | 8.9° | **214.8** | 246.7 | 13.9 | 1493/-331 | -26.6 |
| HighAltitude_NoWind | Straight Slice | 11.9° | **253.0** | 277.4 | 25.0 | 2250/499 | 37.2 |

---

## Club: 3W

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 12.3° | **229.0** | 244.6 | 33.1 | 3258/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 10.8° | **223.4** | 240.7 | 27.1 | 2889/0 | -19.5 |
| SeaLevelNoWind | Pull Hook | 9.3° | **211.5** | 231.6 | 20.4 | 2460/-545 | -52.8 |
| SeaLevelNoWind | Pull Slice | 12.3° | **226.9** | 242.8 | 32.1 | 3181/705 | 23.3 |
| SeaLevelNoWind | Push Straight | 13.8° | **231.7** | 246.0 | 39.1 | 3627/0 | 20.2 |
| SeaLevelNoWind | Push Hook | 12.3° | **226.9** | 242.8 | 32.1 | 3181/-705 | -23.3 |
| SeaLevelNoWind | Push Slice | 15.3° | **230.3** | 243.8 | 43.7 | 3901/865 | 67.6 |
| SeaLevelNoWind | Straight Hook | 10.8° | **221.1** | 238.7 | 26.2 | 2821/-625 | -39.2 |
| SeaLevelNoWind | Straight Slice | 13.8° | **229.9** | 244.4 | 38.0 | 3541/785 | 46.0 |
| SeaLevelBackWind_10ms | Straight | 12.3° | **236.8** | 255.6 | 30.8 | 3258/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 10.8° | **229.2** | 249.9 | 25.0 | 2889/0 | -19.3 |
| SeaLevelBackWind_10ms | Pull Hook | 9.3° | **214.7** | 238.0 | 18.8 | 2460/-545 | -50.6 |
| SeaLevelBackWind_10ms | Pull Slice | 12.3° | **234.5** | 253.5 | 29.8 | 3181/705 | 21.2 |
| SeaLevelBackWind_10ms | Push Straight | 13.8° | **241.2** | 258.5 | 36.5 | 3627/0 | 20.2 |
| SeaLevelBackWind_10ms | Push Hook | 12.3° | **234.5** | 253.5 | 29.8 | 3181/-705 | -21.2 |
| SeaLevelBackWind_10ms | Push Slice | 15.3° | **240.5** | 256.7 | 41.0 | 3901/865 | 65.4 |
| SeaLevelBackWind_10ms | Straight Hook | 10.8° | **226.4** | 247.2 | 24.2 | 2821/-625 | -37.0 |
| SeaLevelBackWind_10ms | Straight Slice | 13.8° | **238.9** | 256.3 | 35.5 | 3541/785 | 43.6 |
| SeaLevelBackWind_20ms | Straight | 12.3° | **243.0** | 264.9 | 28.5 | 3258/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 10.8° | **233.4** | 257.3 | 23.1 | 2889/0 | -19.2 |
| SeaLevelBackWind_20ms | Pull Hook | 9.3° | **216.3** | 243.0 | 17.2 | 2460/-545 | -48.3 |
| SeaLevelBackWind_20ms | Pull Slice | 12.3° | **240.3** | 262.4 | 27.7 | 3181/705 | 19.0 |
| SeaLevelBackWind_20ms | Push Straight | 13.8° | **249.0** | 269.4 | 34.0 | 3627/0 | 20.2 |
| SeaLevelBackWind_20ms | Push Hook | 12.3° | **240.3** | 262.4 | 27.7 | 3181/-705 | -19.0 |
| SeaLevelBackWind_20ms | Push Slice | 15.3° | **248.9** | 267.9 | 38.4 | 3901/865 | 63.2 |
| SeaLevelBackWind_20ms | Straight Hook | 10.8° | **230.3** | 254.4 | 22.3 | 2821/-625 | -34.9 |
| SeaLevelBackWind_20ms | Straight Slice | 13.8° | **246.1** | 266.5 | 33.1 | 3541/785 | 41.4 |
| SeaLevelFrontWind_10ms | Straight | 12.3° | **219.4** | 232.0 | 35.6 | 3258/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 10.8° | **215.9** | 230.0 | 29.3 | 2889/0 | -19.6 |
| SeaLevelFrontWind_10ms | Pull Hook | 9.3° | **206.9** | 223.7 | 22.2 | 2460/-545 | -55.1 |
| SeaLevelFrontWind_10ms | Pull Slice | 12.3° | **217.6** | 230.5 | 34.5 | 3181/705 | 25.6 |
| SeaLevelFrontWind_10ms | Push Straight | 13.8° | **220.3** | 231.7 | 41.8 | 3627/0 | 20.1 |
| SeaLevelFrontWind_10ms | Push Hook | 12.3° | **217.6** | 230.5 | 34.5 | 3181/-705 | -25.6 |
| SeaLevelFrontWind_10ms | Push Slice | 15.3° | **218.6** | 229.6 | 46.5 | 3901/865 | 69.8 |
| SeaLevelFrontWind_10ms | Straight Hook | 10.8° | **214.0** | 228.5 | 28.3 | 2821/-625 | -41.4 |
| SeaLevelFrontWind_10ms | Straight Slice | 13.8° | **219.0** | 230.8 | 40.6 | 3541/785 | 48.2 |
| SeaLevelFrontWind_20ms | Straight | 12.3° | **207.8** | 217.5 | 38.1 | 3258/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 10.8° | **206.3** | 217.4 | 31.5 | 2889/0 | -19.6 |
| SeaLevelFrontWind_20ms | Pull Hook | 9.3° | **200.5** | 214.3 | 24.1 | 2460/-545 | -57.3 |
| SeaLevelFrontWind_20ms | Pull Slice | 12.3° | **206.5** | 216.7 | 36.9 | 3181/705 | 27.9 |
| SeaLevelFrontWind_20ms | Push Straight | 13.8° | **207.0** | 215.9 | 44.5 | 3627/0 | 20.0 |
| SeaLevelFrontWind_20ms | Push Hook | 12.3° | **206.5** | 216.7 | 36.9 | 3181/-705 | -27.9 |
| SeaLevelFrontWind_20ms | Push Slice | 15.3° | **205.1** | 214.0 | 49.4 | 3901/865 | 71.9 |
| SeaLevelFrontWind_20ms | Straight Hook | 10.8° | **205.1** | 216.8 | 30.4 | 2821/-625 | -43.5 |
| SeaLevelFrontWind_20ms | Straight Slice | 13.8° | **206.6** | 215.9 | 43.3 | 3541/785 | 50.5 |
| SeaLevelSideWind_10ms | Straight | 12.3° | **229.2** | 244.9 | 33.2 | 3258/0 | 9.0 |
| SeaLevelSideWind_10ms | Pull Straight | 10.8° | **223.0** | 240.1 | 27.3 | 2889/0 | -11.5 |
| SeaLevelSideWind_10ms | Pull Hook | 9.3° | **209.4** | 228.4 | 20.7 | 2460/-545 | -46.3 |
| SeaLevelSideWind_10ms | Pull Slice | 12.3° | **229.2** | 245.8 | 32.3 | 3181/705 | 32.4 |
| SeaLevelSideWind_10ms | Push Straight | 13.8° | **232.7** | 247.3 | 38.9 | 3627/0 | 29.9 |
| SeaLevelSideWind_10ms | Push Hook | 12.3° | **225.0** | 240.4 | 32.0 | 3181/-705 | -14.6 |
| SeaLevelSideWind_10ms | Push Slice | 15.3° | **235.0** | 249.6 | 43.5 | 3901/865 | 77.9 |
| SeaLevelSideWind_10ms | Straight Hook | 10.8° | **218.9** | 235.8 | 26.3 | 2821/-625 | -31.5 |
| SeaLevelSideWind_10ms | Straight Slice | 13.8° | **233.3** | 248.7 | 38.0 | 3541/785 | 55.7 |
| SeaLevelSideWind_20ms | Straight | 12.3° | **229.5** | 245.5 | 33.3 | 3258/0 | -18.0 |
| SeaLevelSideWind_20ms | Pull Straight | 10.8° | **225.2** | 243.4 | 26.9 | 2889/0 | -35.3 |
| SeaLevelSideWind_20ms | Pull Hook | 9.3° | **216.4** | 238.7 | 20.1 | 2460/-545 | -65.9 |
| SeaLevelSideWind_20ms | Pull Slice | 12.3° | **223.2** | 238.2 | 32.0 | 3181/705 | 5.8 |
| SeaLevelSideWind_20ms | Push Straight | 13.8° | **230.3** | 244.5 | 39.8 | 3627/0 | 0.2 |
| SeaLevelSideWind_20ms | Push Hook | 12.3° | **231.7** | 249.1 | 32.6 | 3181/-705 | -41.6 |
| SeaLevelSideWind_20ms | Push Slice | 15.3° | **221.3** | 232.9 | 44.4 | 3901/865 | 46.5 |
| SeaLevelSideWind_20ms | Straight Hook | 10.8° | **226.2** | 245.8 | 26.2 | 2821/-625 | -55.0 |
| SeaLevelSideWind_20ms | Straight Slice | 13.8° | **223.6** | 236.7 | 38.2 | 3541/785 | 26.5 |
| HighAltitude_NoWind | Straight | 12.3° | **248.6** | 270.2 | 27.3 | 3258/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 10.8° | **236.7** | 260.9 | 21.6 | 2889/0 | -20.6 |
| HighAltitude_NoWind | Pull Hook | 9.3° | **217.1** | 245.1 | 15.8 | 2460/-545 | -48.9 |
| HighAltitude_NoWind | Pull Slice | 12.3° | **245.7** | 267.7 | 26.5 | 3181/705 | 18.4 |
| HighAltitude_NoWind | Push Straight | 13.8° | **257.1** | 276.7 | 33.2 | 3627/0 | 22.4 |
| HighAltitude_NoWind | Push Hook | 12.3° | **245.7** | 267.7 | 26.5 | 3181/-705 | -18.4 |
| HighAltitude_NoWind | Push Slice | 15.3° | **260.1** | 278.3 | 38.1 | 3901/865 | 69.1 |
| HighAltitude_NoWind | Straight Hook | 10.8° | **233.5** | 258.1 | 20.9 | 2821/-625 | -35.2 |
| HighAltitude_NoWind | Straight Slice | 13.8° | **254.5** | 274.4 | 32.3 | 3541/785 | 43.6 |

---

## Club: 4i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 16.6° | **204.6** | 217.9 | 38.2 | 4320/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 15.1° | **204.4** | 218.6 | 33.7 | 3981/0 | -17.8 |
| SeaLevelNoWind | Pull Hook | 13.6° | **200.4** | 216.1 | 28.2 | 3556/-788 | -54.3 |
| SeaLevelNoWind | Pull Slice | 16.6° | **203.2** | 216.7 | 37.3 | 4218/935 | 23.5 |
| SeaLevelNoWind | Push Straight | 18.1° | **203.4** | 215.9 | 42.5 | 4660/0 | 17.7 |
| SeaLevelNoWind | Push Hook | 16.6° | **203.2** | 216.7 | 37.3 | 4218/-935 | -23.5 |
| SeaLevelNoWind | Push Slice | 19.6° | **200.4** | 212.3 | 45.7 | 4881/1082 | 59.6 |
| SeaLevelNoWind | Straight Hook | 15.1° | **202.8** | 217.3 | 32.8 | 3887/-862 | -39.5 |
| SeaLevelNoWind | Straight Slice | 18.1° | **202.4** | 215.0 | 41.6 | 4549/1009 | 42.1 |
| SeaLevelBackWind_10ms | Straight | 16.6° | **213.9** | 230.0 | 35.8 | 4320/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 15.1° | **212.3** | 229.6 | 31.5 | 3981/0 | -17.8 |
| SeaLevelBackWind_10ms | Pull Hook | 13.6° | **206.4** | 225.0 | 26.3 | 3556/-788 | -52.2 |
| SeaLevelBackWind_10ms | Pull Slice | 16.6° | **212.3** | 228.5 | 35.0 | 4218/935 | 21.2 |
| SeaLevelBackWind_10ms | Push Straight | 18.1° | **213.7** | 229.0 | 39.9 | 4660/0 | 17.9 |
| SeaLevelBackWind_10ms | Push Hook | 16.6° | **212.3** | 228.5 | 35.0 | 4218/-935 | -21.2 |
| SeaLevelBackWind_10ms | Push Slice | 19.6° | **210.7** | 225.2 | 43.0 | 4881/1082 | 57.6 |
| SeaLevelBackWind_10ms | Straight Hook | 15.1° | **210.3** | 227.6 | 30.6 | 3887/-862 | -37.3 |
| SeaLevelBackWind_10ms | Straight Slice | 18.1° | **212.0** | 227.4 | 39.1 | 4549/1009 | 39.8 |
| SeaLevelBackWind_20ms | Straight | 16.6° | **221.1** | 240.3 | 33.4 | 4320/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 15.1° | **218.6** | 238.9 | 29.3 | 3981/0 | -17.8 |
| SeaLevelBackWind_20ms | Pull Hook | 13.6° | **210.7** | 232.3 | 24.4 | 3556/-788 | -50.0 |
| SeaLevelBackWind_20ms | Pull Slice | 16.6° | **219.4** | 238.6 | 32.7 | 4218/935 | 19.0 |
| SeaLevelBackWind_20ms | Push Straight | 18.1° | **222.2** | 240.3 | 37.5 | 4660/0 | 18.0 |
| SeaLevelBackWind_20ms | Push Hook | 16.6° | **219.4** | 238.6 | 32.7 | 4218/-935 | -19.0 |
| SeaLevelBackWind_20ms | Push Slice | 19.6° | **219.3** | 236.4 | 40.5 | 4881/1082 | 55.5 |
| SeaLevelBackWind_20ms | Straight Hook | 15.1° | **216.1** | 236.4 | 28.6 | 3887/-862 | -35.1 |
| SeaLevelBackWind_20ms | Straight Slice | 18.1° | **220.3** | 238.4 | 36.7 | 4549/1009 | 37.7 |
| SeaLevelFrontWind_10ms | Straight | 16.6° | **193.8** | 204.4 | 41.0 | 4320/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 15.1° | **195.0** | 206.4 | 36.3 | 3981/0 | -17.8 |
| SeaLevelFrontWind_10ms | Pull Hook | 13.6° | **193.2** | 206.1 | 30.5 | 3556/-788 | -56.6 |
| SeaLevelFrontWind_10ms | Pull Slice | 16.6° | **192.9** | 203.6 | 39.9 | 4218/935 | 26.0 |
| SeaLevelFrontWind_10ms | Push Straight | 18.1° | **191.8** | 201.7 | 45.4 | 4660/0 | 17.6 |
| SeaLevelFrontWind_10ms | Push Hook | 16.6° | **192.9** | 203.6 | 39.9 | 4218/-935 | -26.0 |
| SeaLevelFrontWind_10ms | Push Slice | 19.6° | **188.6** | 198.4 | 48.6 | 4881/1082 | 61.7 |
| SeaLevelFrontWind_10ms | Straight Hook | 15.1° | **193.9** | 205.6 | 35.3 | 3887/-862 | -41.8 |
| SeaLevelFrontWind_10ms | Straight Slice | 18.1° | **191.3** | 201.4 | 44.4 | 4549/1009 | 44.5 |
| SeaLevelFrontWind_20ms | Straight | 16.6° | **181.6** | 189.6 | 43.9 | 4320/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 15.1° | **184.0** | 192.7 | 39.0 | 3981/0 | -17.7 |
| SeaLevelFrontWind_20ms | Pull Hook | 13.6° | **184.7** | 195.0 | 32.9 | 3556/-788 | -59.1 |
| SeaLevelFrontWind_20ms | Pull Slice | 16.6° | **181.1** | 189.5 | 42.8 | 4218/935 | 28.6 |
| SeaLevelFrontWind_20ms | Push Straight | 18.1° | **178.4** | 185.9 | 48.5 | 4660/0 | 17.5 |
| SeaLevelFrontWind_20ms | Push Hook | 16.6° | **181.1** | 189.5 | 42.8 | 4218/-935 | -28.6 |
| SeaLevelFrontWind_20ms | Push Slice | 19.6° | **175.5** | 183.4 | 51.8 | 4881/1082 | 64.0 |
| SeaLevelFrontWind_20ms | Straight Hook | 15.1° | **183.6** | 192.9 | 38.0 | 3887/-862 | -44.3 |
| SeaLevelFrontWind_20ms | Straight Slice | 18.1° | **178.6** | 186.7 | 47.4 | 4549/1009 | 47.0 |
| SeaLevelSideWind_10ms | Straight | 16.6° | **204.6** | 218.0 | 38.3 | 4320/0 | 9.0 |
| SeaLevelSideWind_10ms | Pull Straight | 15.1° | **203.7** | 217.8 | 34.0 | 3981/0 | -9.3 |
| SeaLevelSideWind_10ms | Pull Hook | 13.6° | **197.3** | 211.9 | 28.5 | 3556/-788 | -46.8 |
| SeaLevelSideWind_10ms | Pull Slice | 16.6° | **205.7** | 219.9 | 37.6 | 4218/935 | 32.6 |
| SeaLevelSideWind_10ms | Push Straight | 18.1° | **204.4** | 217.2 | 42.4 | 4660/0 | 27.1 |
| SeaLevelSideWind_10ms | Push Hook | 16.6° | **200.9** | 213.8 | 37.2 | 4218/-935 | -14.6 |
| SeaLevelSideWind_10ms | Push Slice | 19.6° | **204.9** | 218.0 | 45.5 | 4881/1082 | 69.2 |
| SeaLevelSideWind_10ms | Straight Hook | 15.1° | **199.9** | 213.5 | 32.9 | 3887/-862 | -31.2 |
| SeaLevelSideWind_10ms | Straight Slice | 18.1° | **205.8** | 219.4 | 41.7 | 4549/1009 | 51.5 |
| SeaLevelSideWind_20ms | Straight | 16.6° | **204.8** | 218.5 | 38.4 | 4320/0 | -18.0 |
| SeaLevelSideWind_20ms | Pull Straight | 15.1° | **206.2** | 221.3 | 33.5 | 3981/0 | -34.4 |
| SeaLevelSideWind_20ms | Pull Hook | 13.6° | **207.0** | 225.0 | 28.0 | 3556/-788 | -69.4 |
| SeaLevelSideWind_20ms | Pull Slice | 16.6° | **198.8** | 211.4 | 37.1 | 4218/935 | 5.9 |
| SeaLevelSideWind_20ms | Push Straight | 18.1° | **201.7** | 214.1 | 43.2 | 4660/0 | -1.5 |
| SeaLevelSideWind_20ms | Push Hook | 16.6° | **208.3** | 223.3 | 37.9 | 4218/-935 | -41.9 |
| SeaLevelSideWind_20ms | Push Slice | 19.6° | **191.1** | 201.4 | 46.3 | 4881/1082 | 39.7 |
| SeaLevelSideWind_20ms | Straight Hook | 15.1° | **208.8** | 225.2 | 33.0 | 3887/-862 | -56.3 |
| SeaLevelSideWind_20ms | Straight Slice | 18.1° | **195.7** | 207.0 | 41.8 | 4549/1009 | 23.3 |
| HighAltitude_NoWind | Straight | 16.6° | **227.5** | 245.4 | 33.2 | 4320/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 15.1° | **223.1** | 242.5 | 28.6 | 3981/0 | -19.4 |
| HighAltitude_NoWind | Pull Hook | 13.6° | **213.9** | 235.4 | 23.3 | 3556/-788 | -52.2 |
| HighAltitude_NoWind | Pull Slice | 16.6° | **225.5** | 243.6 | 32.4 | 4218/935 | 19.7 |
| HighAltitude_NoWind | Push Straight | 18.1° | **230.1** | 246.7 | 37.8 | 4660/0 | 20.1 |
| HighAltitude_NoWind | Push Hook | 16.6° | **225.5** | 243.6 | 32.4 | 4218/-935 | -19.7 |
| HighAltitude_NoWind | Push Slice | 19.6° | **229.3** | 245.0 | 41.4 | 4881/1082 | 62.1 |
| HighAltitude_NoWind | Straight Hook | 15.1° | **220.9** | 240.6 | 27.8 | 3887/-862 | -36.8 |
| HighAltitude_NoWind | Straight Slice | 18.1° | **228.3** | 245.1 | 36.9 | 4549/1009 | 41.2 |

---

## Club: 5i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 18.9° | **192.0** | 204.4 | 39.9 | 4846/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 17.4° | **193.0** | 206.1 | 36.1 | 4514/0 | -16.8 |
| SeaLevelNoWind | Pull Hook | 15.9° | **191.5** | 205.7 | 31.2 | 4083/-905 | -53.1 |
| SeaLevelNoWind | Pull Slice | 18.9° | **190.9** | 203.4 | 39.1 | 4731/1049 | 22.6 |
| SeaLevelNoWind | Push Straight | 20.4° | **189.9** | 201.6 | 43.6 | 5178/0 | 16.6 |
| SeaLevelNoWind | Push Hook | 18.9° | **190.9** | 203.4 | 39.1 | 4731/-1049 | -22.6 |
| SeaLevelNoWind | Push Slice | 21.9° | **186.4** | 197.7 | 46.2 | 5379/1193 | 55.3 |
| SeaLevelNoWind | Straight Hook | 17.4° | **191.8** | 205.0 | 35.3 | 4407/-977 | -38.2 |
| SeaLevelNoWind | Straight Slice | 20.4° | **189.0** | 200.8 | 42.7 | 5055/1121 | 39.4 |
| SeaLevelBackWind_10ms | Straight | 18.9° | **201.2** | 216.4 | 37.4 | 4846/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 17.4° | **201.4** | 217.4 | 33.7 | 4514/0 | -16.9 |
| SeaLevelBackWind_10ms | Pull Hook | 15.9° | **198.0** | 215.1 | 29.1 | 4083/-905 | -50.9 |
| SeaLevelBackWind_10ms | Pull Slice | 18.9° | **199.9** | 215.1 | 36.6 | 4731/1049 | 20.2 |
| SeaLevelBackWind_10ms | Push Straight | 20.4° | **200.0** | 214.4 | 40.9 | 5178/0 | 16.7 |
| SeaLevelBackWind_10ms | Push Hook | 18.9° | **199.9** | 215.1 | 36.6 | 4731/-1049 | -20.2 |
| SeaLevelBackWind_10ms | Push Slice | 21.9° | **196.6** | 210.2 | 43.5 | 5379/1193 | 53.3 |
| SeaLevelBackWind_10ms | Straight Hook | 17.4° | **199.6** | 215.7 | 32.9 | 4407/-977 | -35.9 |
| SeaLevelBackWind_10ms | Straight Slice | 20.4° | **198.6** | 213.0 | 40.1 | 5055/1121 | 37.2 |
| SeaLevelBackWind_20ms | Straight | 18.9° | **208.5** | 226.6 | 34.9 | 4846/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 17.4° | **207.8** | 226.7 | 31.4 | 4514/0 | -16.9 |
| SeaLevelBackWind_20ms | Pull Hook | 15.9° | **202.7** | 222.6 | 27.0 | 4083/-905 | -48.7 |
| SeaLevelBackWind_20ms | Pull Slice | 18.9° | **207.2** | 225.3 | 34.3 | 4731/1049 | 17.9 |
| SeaLevelBackWind_20ms | Push Straight | 20.4° | **208.1** | 225.3 | 38.3 | 5178/0 | 16.8 |
| SeaLevelBackWind_20ms | Push Hook | 18.9° | **207.2** | 225.3 | 34.3 | 4731/-1049 | -17.9 |
| SeaLevelBackWind_20ms | Push Slice | 21.9° | **204.9** | 221.2 | 40.9 | 5379/1193 | 51.3 |
| SeaLevelBackWind_20ms | Straight Hook | 17.4° | **205.6** | 224.5 | 30.7 | 4407/-977 | -33.7 |
| SeaLevelBackWind_20ms | Straight Slice | 20.4° | **206.5** | 223.7 | 37.6 | 5055/1121 | 35.0 |
| SeaLevelFrontWind_10ms | Straight | 18.9° | **181.0** | 190.8 | 42.6 | 4846/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 17.4° | **183.1** | 193.5 | 38.6 | 4514/0 | -16.7 |
| SeaLevelFrontWind_10ms | Pull Hook | 15.9° | **183.4** | 195.0 | 33.5 | 4083/-905 | -55.4 |
| SeaLevelFrontWind_10ms | Pull Slice | 18.9° | **180.2** | 190.2 | 41.7 | 4731/1049 | 25.0 |
| SeaLevelFrontWind_10ms | Push Straight | 20.4° | **178.1** | 187.4 | 46.3 | 5178/0 | 16.4 |
| SeaLevelFrontWind_10ms | Push Hook | 18.9° | **180.2** | 190.2 | 41.7 | 4731/-1049 | -25.0 |
| SeaLevelFrontWind_10ms | Push Slice | 21.9° | **174.7** | 183.9 | 49.0 | 5379/1193 | 57.3 |
| SeaLevelFrontWind_10ms | Straight Hook | 17.4° | **182.3** | 192.9 | 37.7 | 4407/-977 | -40.5 |
| SeaLevelFrontWind_10ms | Straight Slice | 20.4° | **177.8** | 187.3 | 45.5 | 5055/1121 | 41.8 |
| SeaLevelFrontWind_20ms | Straight | 18.9° | **168.2** | 175.7 | 45.5 | 4846/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 17.4° | **171.5** | 179.5 | 41.4 | 4514/0 | -16.7 |
| SeaLevelFrontWind_20ms | Pull Hook | 15.9° | **173.9** | 183.2 | 36.0 | 4083/-905 | -57.7 |
| SeaLevelFrontWind_20ms | Pull Slice | 18.9° | **167.9** | 175.7 | 44.5 | 4731/1049 | 27.7 |
| SeaLevelFrontWind_20ms | Push Straight | 20.4° | **164.6** | 171.7 | 49.3 | 5178/0 | 16.2 |
| SeaLevelFrontWind_20ms | Push Hook | 18.9° | **167.9** | 175.7 | 44.5 | 4731/-1049 | -27.7 |
| SeaLevelFrontWind_20ms | Push Slice | 21.9° | **161.6** | 169.0 | 52.1 | 5379/1193 | 59.5 |
| SeaLevelFrontWind_20ms | Straight Hook | 17.4° | **171.4** | 179.9 | 40.4 | 4407/-977 | -43.0 |
| SeaLevelFrontWind_20ms | Straight Slice | 20.4° | **164.9** | 172.4 | 48.4 | 5055/1121 | 44.2 |
| SeaLevelSideWind_10ms | Straight | 18.9° | **192.0** | 204.5 | 40.0 | 4846/0 | 8.8 |
| SeaLevelSideWind_10ms | Pull Straight | 17.4° | **192.3** | 205.3 | 36.4 | 4514/0 | -8.4 |
| SeaLevelSideWind_10ms | Pull Hook | 15.9° | **188.1** | 201.3 | 31.5 | 4083/-905 | -45.4 |
| SeaLevelSideWind_10ms | Pull Slice | 18.9° | **193.3** | 206.5 | 39.4 | 4731/1049 | 31.5 |
| SeaLevelSideWind_10ms | Push Straight | 20.4° | **190.9** | 202.9 | 43.4 | 5178/0 | 25.6 |
| SeaLevelSideWind_10ms | Push Hook | 18.9° | **188.8** | 200.7 | 38.9 | 4731/-1049 | -13.9 |
| SeaLevelSideWind_10ms | Push Slice | 21.9° | **190.8** | 203.1 | 46.0 | 5379/1193 | 64.5 |
| SeaLevelSideWind_10ms | Straight Hook | 17.4° | **188.9** | 201.4 | 35.3 | 4407/-977 | -30.0 |
| SeaLevelSideWind_10ms | Straight Slice | 20.4° | **192.5** | 205.2 | 42.8 | 5055/1121 | 48.6 |
| SeaLevelSideWind_20ms | Straight | 18.9° | **192.1** | 204.9 | 40.1 | 4846/0 | -17.6 |
| SeaLevelSideWind_20ms | Pull Straight | 17.4° | **195.0** | 209.0 | 35.9 | 4514/0 | -33.3 |
| SeaLevelSideWind_20ms | Pull Hook | 15.9° | **198.4** | 215.1 | 31.0 | 4083/-905 | -68.5 |
| SeaLevelSideWind_20ms | Pull Slice | 18.9° | **186.6** | 198.2 | 38.8 | 4731/1049 | 5.3 |
| SeaLevelSideWind_20ms | Push Straight | 20.4° | **188.1** | 199.9 | 44.3 | 5178/0 | -2.1 |
| SeaLevelSideWind_20ms | Push Hook | 18.9° | **195.8** | 209.9 | 39.8 | 4731/-1049 | -40.6 |
| SeaLevelSideWind_20ms | Push Slice | 21.9° | **177.5** | 187.3 | 46.8 | 5379/1193 | 36.2 |
| SeaLevelSideWind_20ms | Straight Hook | 17.4° | **198.0** | 213.3 | 35.4 | 4407/-977 | -54.9 |
| SeaLevelSideWind_20ms | Straight Slice | 20.4° | **182.5** | 193.1 | 42.9 | 5055/1121 | 21.3 |
| HighAltitude_NoWind | Straight | 18.9° | **215.7** | 232.1 | 35.5 | 4846/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 17.4° | **213.6** | 231.2 | 31.4 | 4514/0 | -18.6 |
| HighAltitude_NoWind | Pull Hook | 15.9° | **207.5** | 226.8 | 26.6 | 4083/-905 | -51.9 |
| HighAltitude_NoWind | Pull Slice | 18.9° | **214.1** | 230.7 | 34.7 | 4731/1049 | 19.5 |
| HighAltitude_NoWind | Push Straight | 20.4° | **216.4** | 231.8 | 39.5 | 5178/0 | 18.9 |
| HighAltitude_NoWind | Push Hook | 18.9° | **214.1** | 230.7 | 34.7 | 4731/-1049 | -19.5 |
| HighAltitude_NoWind | Push Slice | 21.9° | **214.6** | 229.2 | 42.6 | 5379/1193 | 58.2 |
| HighAltitude_NoWind | Straight Hook | 17.4° | **211.6** | 229.5 | 30.7 | 4407/-977 | -36.3 |
| HighAltitude_NoWind | Straight Slice | 20.4° | **214.9** | 230.5 | 38.7 | 5055/1121 | 39.2 |

---

## Club: 6i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 21.2° | **180.0** | 191.6 | 41.1 | 5344/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 19.7° | **182.1** | 194.3 | 37.8 | 5020/0 | -15.9 |
| SeaLevelNoWind | Pull Hook | 18.2° | **182.0** | 195.1 | 33.6 | 4584/-1016 | -51.2 |
| SeaLevelNoWind | Pull Slice | 21.2° | **179.3** | 191.0 | 40.4 | 5218/1157 | 21.3 |
| SeaLevelNoWind | Push Straight | 22.7° | **177.5** | 188.6 | 44.2 | 5669/0 | 15.5 |
| SeaLevelNoWind | Push Hook | 21.2° | **179.3** | 191.0 | 40.4 | 5218/-1157 | -21.3 |
| SeaLevelNoWind | Push Slice | 24.2° | **174.0** | 184.7 | 46.5 | 5851/1297 | 51.3 |
| SeaLevelNoWind | Straight Hook | 19.7° | **181.1** | 193.4 | 37.1 | 4901/-1086 | -36.4 |
| SeaLevelNoWind | Straight Slice | 22.7° | **176.8** | 188.0 | 43.5 | 5534/1227 | 36.7 |
| SeaLevelBackWind_10ms | Straight | 21.2° | **189.2** | 203.4 | 38.5 | 5344/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 19.7° | **190.2** | 205.2 | 35.3 | 5020/0 | -15.9 |
| SeaLevelBackWind_10ms | Pull Hook | 18.2° | **188.7** | 204.5 | 31.3 | 4584/-1016 | -48.9 |
| SeaLevelBackWind_10ms | Pull Slice | 21.2° | **188.1** | 202.4 | 37.8 | 5218/1157 | 18.9 |
| SeaLevelBackWind_10ms | Push Straight | 22.7° | **187.2** | 200.8 | 41.5 | 5669/0 | 15.6 |
| SeaLevelBackWind_10ms | Push Hook | 21.2° | **188.1** | 202.4 | 37.8 | 5218/-1157 | -18.9 |
| SeaLevelBackWind_10ms | Push Slice | 24.2° | **183.7** | 196.6 | 43.7 | 5851/1297 | 49.3 |
| SeaLevelBackWind_10ms | Straight Hook | 19.7° | **189.0** | 204.0 | 34.6 | 4901/-1086 | -34.1 |
| SeaLevelBackWind_10ms | Straight Slice | 22.7° | **186.3** | 199.8 | 40.8 | 5534/1227 | 34.5 |
| SeaLevelBackWind_20ms | Straight | 21.2° | **196.5** | 213.5 | 36.0 | 5344/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 19.7° | **196.6** | 214.4 | 32.9 | 5020/0 | -16.0 |
| SeaLevelBackWind_20ms | Pull Hook | 18.2° | **193.8** | 212.4 | 29.1 | 4584/-1016 | -46.7 |
| SeaLevelBackWind_20ms | Pull Slice | 21.2° | **195.2** | 212.2 | 35.4 | 5218/1157 | 16.6 |
| SeaLevelBackWind_20ms | Push Straight | 22.7° | **195.1** | 211.4 | 38.9 | 5669/0 | 15.7 |
| SeaLevelBackWind_20ms | Push Hook | 21.2° | **195.2** | 212.2 | 35.4 | 5218/-1157 | -16.6 |
| SeaLevelBackWind_20ms | Push Slice | 24.2° | **191.8** | 207.2 | 41.2 | 5851/1297 | 47.3 |
| SeaLevelBackWind_20ms | Straight Hook | 19.7° | **194.9** | 212.7 | 32.3 | 4901/-1086 | -31.8 |
| SeaLevelBackWind_20ms | Straight Slice | 22.7° | **193.8** | 210.0 | 38.3 | 5534/1227 | 32.3 |
| SeaLevelFrontWind_10ms | Straight | 21.2° | **169.1** | 178.3 | 43.9 | 5344/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 19.7° | **171.8** | 181.5 | 40.5 | 5020/0 | -15.7 |
| SeaLevelFrontWind_10ms | Pull Hook | 18.2° | **173.4** | 184.1 | 36.0 | 4584/-1016 | -53.3 |
| SeaLevelFrontWind_10ms | Pull Slice | 21.2° | **168.6** | 177.9 | 43.0 | 5218/1157 | 23.8 |
| SeaLevelFrontWind_10ms | Push Straight | 22.7° | **165.8** | 174.6 | 47.0 | 5669/0 | 15.3 |
| SeaLevelFrontWind_10ms | Push Hook | 21.2° | **168.6** | 177.9 | 43.0 | 5218/-1157 | -23.8 |
| SeaLevelFrontWind_10ms | Push Slice | 24.2° | **162.5** | 171.2 | 49.3 | 5851/1297 | 53.3 |
| SeaLevelFrontWind_10ms | Straight Hook | 19.7° | **171.4** | 181.3 | 39.6 | 4901/-1086 | -38.7 |
| SeaLevelFrontWind_10ms | Straight Slice | 22.7° | **165.7** | 174.7 | 46.3 | 5534/1227 | 39.0 |
| SeaLevelFrontWind_20ms | Straight | 21.2° | **156.3** | 163.2 | 46.7 | 5344/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 19.7° | **159.9** | 167.3 | 43.2 | 5020/0 | -15.6 |
| SeaLevelFrontWind_20ms | Pull Hook | 18.2° | **163.4** | 171.9 | 38.6 | 4584/-1016 | -55.6 |
| SeaLevelFrontWind_20ms | Pull Slice | 21.2° | **156.1** | 163.4 | 45.8 | 5218/1157 | 26.4 |
| SeaLevelFrontWind_20ms | Push Straight | 22.7° | **152.4** | 159.0 | 50.0 | 5669/0 | 15.1 |
| SeaLevelFrontWind_20ms | Push Hook | 21.2° | **156.1** | 163.4 | 45.8 | 5218/-1157 | -26.4 |
| SeaLevelFrontWind_20ms | Push Slice | 24.2° | **149.4** | 156.3 | 52.2 | 5851/1297 | 55.3 |
| SeaLevelFrontWind_20ms | Straight Hook | 19.7° | **160.0** | 167.8 | 42.3 | 4901/-1086 | -41.1 |
| SeaLevelFrontWind_20ms | Straight Slice | 22.7° | **152.8** | 159.8 | 49.2 | 5534/1227 | 41.4 |
| SeaLevelSideWind_10ms | Straight | 21.2° | **180.2** | 191.9 | 41.2 | 5344/0 | 8.5 |
| SeaLevelSideWind_10ms | Pull Straight | 19.7° | **181.2** | 193.2 | 38.1 | 5020/0 | -7.6 |
| SeaLevelSideWind_10ms | Pull Hook | 18.2° | **178.4** | 190.6 | 33.9 | 4584/-1016 | -43.4 |
| SeaLevelSideWind_10ms | Pull Slice | 21.2° | **181.7** | 194.0 | 40.7 | 5218/1157 | 30.0 |
| SeaLevelSideWind_10ms | Push Straight | 22.7° | **178.4** | 189.8 | 44.0 | 5669/0 | 24.2 |
| SeaLevelSideWind_10ms | Push Hook | 21.2° | **177.1** | 188.3 | 40.2 | 5218/-1157 | -12.8 |
| SeaLevelSideWind_10ms | Push Slice | 24.2° | **178.0** | 189.7 | 46.3 | 5851/1297 | 60.0 |
| SeaLevelSideWind_10ms | Straight Hook | 19.7° | **178.0** | 189.6 | 37.1 | 4901/-1086 | -28.3 |
| SeaLevelSideWind_10ms | Straight Slice | 22.7° | **180.1** | 192.1 | 43.6 | 5534/1227 | 45.5 |
| SeaLevelSideWind_20ms | Straight | 21.2° | **180.2** | 192.2 | 41.3 | 5344/0 | -17.1 |
| SeaLevelSideWind_20ms | Pull Straight | 19.7° | **183.9** | 196.9 | 37.6 | 5020/0 | -32.1 |
| SeaLevelSideWind_20ms | Pull Hook | 18.2° | **189.0** | 204.5 | 33.4 | 4584/-1016 | -66.4 |
| SeaLevelSideWind_20ms | Pull Slice | 21.2° | **174.9** | 185.8 | 40.1 | 5218/1157 | 4.5 |
| SeaLevelSideWind_20ms | Push Straight | 22.7° | **175.6** | 186.7 | 44.9 | 5669/0 | -2.5 |
| SeaLevelSideWind_20ms | Push Hook | 21.2° | **184.0** | 197.2 | 41.1 | 5218/-1157 | -38.8 |
| SeaLevelSideWind_20ms | Push Slice | 24.2° | **165.4** | 174.6 | 47.1 | 5851/1297 | 32.9 |
| SeaLevelSideWind_20ms | Straight Hook | 19.7° | **187.1** | 201.4 | 37.3 | 4901/-1086 | -52.8 |
| SeaLevelSideWind_20ms | Straight Slice | 22.7° | **170.4** | 180.5 | 43.7 | 5534/1227 | 19.2 |
| HighAltitude_NoWind | Straight | 21.2° | **204.0** | 219.2 | 37.3 | 5344/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 19.7° | **203.3** | 219.5 | 33.7 | 5020/0 | -17.7 |
| HighAltitude_NoWind | Pull Hook | 18.2° | **199.9** | 217.4 | 29.3 | 4584/-1016 | -50.9 |
| HighAltitude_NoWind | Pull Slice | 21.2° | **202.7** | 218.0 | 36.6 | 5218/1157 | 18.7 |
| HighAltitude_NoWind | Push Straight | 22.7° | **203.4** | 217.6 | 40.8 | 5669/0 | 17.7 |
| HighAltitude_NoWind | Push Hook | 21.2° | **202.7** | 218.0 | 36.6 | 5218/-1157 | -18.7 |
| HighAltitude_NoWind | Push Slice | 24.2° | **201.1** | 214.7 | 43.5 | 5851/1297 | 54.4 |
| HighAltitude_NoWind | Straight Hook | 19.7° | **202.0** | 218.3 | 33.0 | 4901/-1086 | -35.2 |
| HighAltitude_NoWind | Straight Slice | 22.7° | **202.4** | 216.8 | 40.1 | 5534/1227 | 37.0 |

---

## Club: 7i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 23.9° | **165.3** | 176.2 | 41.0 | 5836/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 22.4° | **167.7** | 179.1 | 38.3 | 5523/0 | -14.6 |
| SeaLevelNoWind | Pull Hook | 20.9° | **168.6** | 180.7 | 34.7 | 5086/-1127 | -47.3 |
| SeaLevelNoWind | Pull Slice | 23.9° | **164.7** | 175.7 | 40.4 | 5698/1263 | 19.0 |
| SeaLevelNoWind | Push Straight | 25.4° | **162.6** | 173.0 | 43.6 | 6150/0 | 14.2 |
| SeaLevelNoWind | Push Hook | 23.9° | **164.7** | 175.7 | 40.4 | 5698/-1263 | -19.0 |
| SeaLevelNoWind | Push Slice | 26.9° | **159.2** | 169.2 | 45.5 | 6310/1399 | 46.1 |
| SeaLevelNoWind | Straight Hook | 22.4° | **166.9** | 178.4 | 37.6 | 5392/-1195 | -33.2 |
| SeaLevelNoWind | Straight Slice | 25.4° | **162.1** | 172.6 | 43.0 | 6004/1331 | 33.0 |
| SeaLevelBackWind_10ms | Straight | 23.9° | **173.9** | 187.2 | 38.4 | 5836/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 22.4° | **175.5** | 189.5 | 35.7 | 5523/0 | -14.7 |
| SeaLevelBackWind_10ms | Pull Hook | 20.9° | **175.1** | 189.8 | 32.3 | 5086/-1127 | -45.1 |
| SeaLevelBackWind_10ms | Pull Slice | 23.9° | **173.1** | 186.5 | 37.8 | 5698/1263 | 16.7 |
| SeaLevelBackWind_10ms | Push Straight | 25.4° | **171.7** | 184.5 | 41.0 | 6150/0 | 14.3 |
| SeaLevelBackWind_10ms | Push Hook | 23.9° | **173.1** | 186.5 | 37.8 | 5698/-1263 | -16.7 |
| SeaLevelBackWind_10ms | Push Slice | 26.9° | **168.2** | 180.4 | 42.8 | 6310/1399 | 44.1 |
| SeaLevelBackWind_10ms | Straight Hook | 22.4° | **174.5** | 188.5 | 35.1 | 5392/-1195 | -31.0 |
| SeaLevelBackWind_10ms | Straight Slice | 25.4° | **171.0** | 183.7 | 40.4 | 6004/1331 | 30.8 |
| SeaLevelBackWind_20ms | Straight | 23.9° | **180.6** | 196.6 | 35.9 | 5836/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 22.4° | **181.5** | 198.3 | 33.4 | 5523/0 | -14.7 |
| SeaLevelBackWind_20ms | Pull Hook | 20.9° | **180.1** | 197.5 | 30.1 | 5086/-1127 | -42.9 |
| SeaLevelBackWind_20ms | Pull Slice | 23.9° | **179.8** | 195.8 | 35.5 | 5698/1263 | 14.4 |
| SeaLevelBackWind_20ms | Push Straight | 25.4° | **179.0** | 194.3 | 38.5 | 6150/0 | 14.4 |
| SeaLevelBackWind_20ms | Push Hook | 23.9° | **179.8** | 195.8 | 35.5 | 5698/-1263 | -14.4 |
| SeaLevelBackWind_20ms | Push Slice | 26.9° | **175.7** | 190.1 | 40.4 | 6310/1399 | 42.2 |
| SeaLevelBackWind_20ms | Straight Hook | 22.4° | **180.5** | 197.1 | 32.8 | 5392/-1195 | -28.8 |
| SeaLevelBackWind_20ms | Straight Slice | 25.4° | **178.0** | 193.2 | 38.0 | 6004/1331 | 28.7 |
| SeaLevelFrontWind_10ms | Straight | 23.9° | **155.0** | 163.5 | 43.7 | 5836/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 22.4° | **157.8** | 166.9 | 40.9 | 5523/0 | -14.5 |
| SeaLevelFrontWind_10ms | Pull Hook | 20.9° | **160.3** | 170.1 | 37.2 | 5086/-1127 | -49.6 |
| SeaLevelFrontWind_10ms | Pull Slice | 23.9° | **154.6** | 163.3 | 43.0 | 5698/1263 | 21.5 |
| SeaLevelFrontWind_10ms | Push Straight | 25.4° | **151.5** | 159.7 | 46.4 | 6150/0 | 14.0 |
| SeaLevelFrontWind_10ms | Push Hook | 23.9° | **154.6** | 163.3 | 43.0 | 5698/-1263 | -21.5 |
| SeaLevelFrontWind_10ms | Push Slice | 26.9° | **148.3** | 156.4 | 48.3 | 6310/1399 | 48.0 |
| SeaLevelFrontWind_10ms | Straight Hook | 22.4° | **157.6** | 166.8 | 40.2 | 5392/-1195 | -35.6 |
| SeaLevelFrontWind_10ms | Straight Slice | 25.4° | **151.5** | 159.8 | 45.7 | 6004/1331 | 35.2 |
| SeaLevelFrontWind_20ms | Straight | 23.9° | **142.5** | 148.9 | 46.6 | 5836/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 22.4° | **146.2** | 153.0 | 43.7 | 5523/0 | -14.4 |
| SeaLevelFrontWind_20ms | Pull Hook | 20.9° | **150.3** | 158.1 | 39.8 | 5086/-1127 | -51.8 |
| SeaLevelFrontWind_20ms | Pull Slice | 23.9° | **142.5** | 149.2 | 45.8 | 5698/1263 | 24.1 |
| SeaLevelFrontWind_20ms | Push Straight | 25.4° | **138.8** | 144.8 | 49.3 | 6150/0 | 13.8 |
| SeaLevelFrontWind_20ms | Push Hook | 23.9° | **142.5** | 149.2 | 45.8 | 5698/-1263 | -24.1 |
| SeaLevelFrontWind_20ms | Push Slice | 26.9° | **136.0** | 142.3 | 51.2 | 6310/1399 | 50.1 |
| SeaLevelFrontWind_20ms | Straight Hook | 22.4° | **146.6** | 153.8 | 42.9 | 5392/-1195 | -38.0 |
| SeaLevelFrontWind_20ms | Straight Slice | 25.4° | **139.3** | 145.7 | 48.6 | 6004/1331 | 37.7 |
| SeaLevelSideWind_10ms | Straight | 23.9° | **165.4** | 176.4 | 41.1 | 5836/0 | 8.0 |
| SeaLevelSideWind_10ms | Pull Straight | 22.4° | **166.9** | 178.2 | 38.5 | 5523/0 | -6.8 |
| SeaLevelSideWind_10ms | Pull Hook | 20.9° | **165.2** | 176.4 | 35.0 | 5086/-1127 | -39.9 |
| SeaLevelSideWind_10ms | Pull Slice | 23.9° | **166.9** | 178.5 | 40.7 | 5698/1263 | 27.2 |
| SeaLevelSideWind_10ms | Push Straight | 25.4° | **163.4** | 174.2 | 43.4 | 6150/0 | 22.3 |
| SeaLevelSideWind_10ms | Push Hook | 23.9° | **162.8** | 173.3 | 40.2 | 5698/-1263 | -11.1 |
| SeaLevelSideWind_10ms | Push Slice | 26.9° | **162.8** | 173.8 | 45.3 | 6310/1399 | 54.2 |
| SeaLevelSideWind_10ms | Straight Hook | 22.4° | **164.2** | 175.0 | 37.7 | 5392/-1195 | -25.6 |
| SeaLevelSideWind_10ms | Straight Slice | 25.4° | **165.0** | 176.3 | 43.1 | 6004/1331 | 41.1 |
| SeaLevelSideWind_20ms | Straight | 23.9° | **165.3** | 176.6 | 41.2 | 5836/0 | -16.1 |
| SeaLevelSideWind_20ms | Pull Straight | 22.4° | **169.3** | 181.4 | 38.0 | 5523/0 | -29.9 |
| SeaLevelSideWind_20ms | Pull Hook | 20.9° | **175.4** | 189.7 | 34.5 | 5086/-1127 | -62.0 |
| SeaLevelSideWind_20ms | Pull Slice | 23.9° | **160.7** | 170.9 | 40.1 | 5698/1263 | 3.2 |
| SeaLevelSideWind_20ms | Push Straight | 25.4° | **160.7** | 171.2 | 44.3 | 6150/0 | -2.7 |
| SeaLevelSideWind_20ms | Push Hook | 23.9° | **169.2** | 181.6 | 41.1 | 5698/-1263 | -35.7 |
| SeaLevelSideWind_20ms | Push Slice | 26.9° | **151.1** | 159.7 | 46.1 | 6310/1399 | 29.0 |
| SeaLevelSideWind_20ms | Straight Hook | 22.4° | **172.7** | 186.0 | 37.9 | 5392/-1195 | -48.9 |
| SeaLevelSideWind_20ms | Straight Slice | 25.4° | **156.2** | 165.7 | 43.2 | 6004/1331 | 16.6 |
| HighAltitude_NoWind | Straight | 23.9° | **187.9** | 201.9 | 37.9 | 5836/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 22.4° | **188.5** | 203.3 | 34.8 | 5523/0 | -16.4 |
| HighAltitude_NoWind | Pull Hook | 20.9° | **186.7** | 202.7 | 31.1 | 5086/-1127 | -47.7 |
| HighAltitude_NoWind | Pull Slice | 23.9° | **186.9** | 201.0 | 37.3 | 5698/1263 | 16.9 |
| HighAltitude_NoWind | Push Straight | 25.4° | **186.7** | 199.9 | 40.9 | 6150/0 | 16.3 |
| HighAltitude_NoWind | Push Hook | 23.9° | **186.9** | 201.0 | 37.3 | 5698/-1263 | -16.9 |
| HighAltitude_NoWind | Push Slice | 26.9° | **184.1** | 196.8 | 43.2 | 6310/1399 | 49.1 |
| HighAltitude_NoWind | Straight Hook | 22.4° | **187.2** | 202.2 | 34.2 | 5392/-1195 | -32.6 |
| HighAltitude_NoWind | Straight Slice | 25.4° | **185.7** | 199.0 | 40.3 | 6004/1331 | 33.3 |

---

## Club: 8i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 27.5° | **148.0** | 158.0 | 40.6 | 6452/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 26.0° | **150.6** | 161.0 | 38.4 | 6149/0 | -13.1 |
| SeaLevelNoWind | Pull Hook | 24.5° | **152.3** | 163.3 | 35.5 | 5708/-1265 | -42.3 |
| SeaLevelNoWind | Pull Slice | 27.5° | **147.7** | 157.7 | 40.1 | 6299/1396 | 16.2 |
| SeaLevelNoWind | Push Straight | 29.0° | **145.2** | 154.7 | 42.7 | 6754/0 | 12.7 |
| SeaLevelNoWind | Push Hook | 27.5° | **147.7** | 157.7 | 40.1 | 6299/-1396 | -16.2 |
| SeaLevelNoWind | Push Slice | 30.5° | **141.8** | 151.0 | 44.3 | 6889/1527 | 40.0 |
| SeaLevelNoWind | Straight Hook | 26.0° | **150.2** | 160.7 | 37.8 | 6003/-1331 | -29.2 |
| SeaLevelNoWind | Straight Slice | 29.0° | **144.9** | 154.4 | 42.2 | 6594/1462 | 28.5 |
| SeaLevelBackWind_10ms | Straight | 27.5° | **156.0** | 168.3 | 38.1 | 6452/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 26.0° | **158.1** | 170.9 | 35.9 | 6149/0 | -13.2 |
| SeaLevelBackWind_10ms | Pull Hook | 24.5° | **158.7** | 172.0 | 33.2 | 5708/-1265 | -40.2 |
| SeaLevelBackWind_10ms | Pull Slice | 27.5° | **155.7** | 167.9 | 37.7 | 6299/1396 | 14.0 |
| SeaLevelBackWind_10ms | Push Straight | 29.0° | **153.6** | 165.3 | 40.2 | 6754/0 | 12.8 |
| SeaLevelBackWind_10ms | Push Hook | 27.5° | **155.7** | 167.9 | 37.7 | 6299/-1396 | -14.0 |
| SeaLevelBackWind_10ms | Push Slice | 30.5° | **150.3** | 161.5 | 41.8 | 6889/1527 | 38.2 |
| SeaLevelBackWind_10ms | Straight Hook | 26.0° | **157.4** | 170.2 | 35.4 | 6003/-1331 | -27.1 |
| SeaLevelBackWind_10ms | Straight Slice | 29.0° | **153.1** | 164.8 | 39.8 | 6594/1462 | 26.4 |
| SeaLevelBackWind_20ms | Straight | 27.5° | **162.3** | 176.9 | 35.8 | 6452/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 26.0° | **163.9** | 179.2 | 33.6 | 6149/0 | -13.3 |
| SeaLevelBackWind_20ms | Pull Hook | 24.5° | **163.5** | 179.4 | 31.0 | 5708/-1265 | -38.1 |
| SeaLevelBackWind_20ms | Pull Slice | 27.5° | **161.7** | 176.3 | 35.4 | 6299/1396 | 11.8 |
| SeaLevelBackWind_20ms | Push Straight | 29.0° | **160.3** | 174.3 | 37.8 | 6754/0 | 12.9 |
| SeaLevelBackWind_20ms | Push Hook | 27.5° | **161.7** | 176.3 | 35.4 | 6299/-1396 | -11.8 |
| SeaLevelBackWind_20ms | Push Slice | 30.5° | **157.1** | 170.4 | 39.5 | 6889/1527 | 36.4 |
| SeaLevelBackWind_20ms | Straight Hook | 26.0° | **162.9** | 178.1 | 33.2 | 6003/-1331 | -25.0 |
| SeaLevelBackWind_20ms | Straight Slice | 29.0° | **159.8** | 173.7 | 37.5 | 6594/1462 | 24.5 |
| SeaLevelFrontWind_10ms | Straight | 27.5° | **138.2** | 145.9 | 43.3 | 6452/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 26.0° | **141.4** | 149.6 | 41.0 | 6149/0 | -13.0 |
| SeaLevelFrontWind_10ms | Pull Hook | 24.5° | **144.2** | 153.1 | 38.0 | 5708/-1265 | -44.4 |
| SeaLevelFrontWind_10ms | Pull Slice | 27.5° | **138.1** | 146.0 | 42.7 | 6299/1396 | 18.6 |
| SeaLevelFrontWind_10ms | Push Straight | 29.0° | **134.9** | 142.3 | 45.4 | 6754/0 | 12.5 |
| SeaLevelFrontWind_10ms | Push Hook | 27.5° | **138.1** | 146.0 | 42.7 | 6299/-1396 | -18.6 |
| SeaLevelFrontWind_10ms | Push Slice | 30.5° | **131.8** | 139.0 | 46.9 | 6889/1527 | 41.9 |
| SeaLevelFrontWind_10ms | Straight Hook | 26.0° | **141.3** | 149.7 | 40.4 | 6003/-1331 | -31.5 |
| SeaLevelFrontWind_10ms | Straight Slice | 29.0° | **135.0** | 142.5 | 44.9 | 6594/1462 | 30.7 |
| SeaLevelFrontWind_20ms | Straight | 27.5° | **126.6** | 132.2 | 46.1 | 6452/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 26.0° | **130.3** | 136.2 | 43.8 | 6149/0 | -12.9 |
| SeaLevelFrontWind_20ms | Pull Hook | 24.5° | **134.6** | 141.5 | 40.6 | 5708/-1265 | -46.7 |
| SeaLevelFrontWind_20ms | Pull Slice | 27.5° | **126.7** | 132.5 | 45.5 | 6299/1396 | 21.2 |
| SeaLevelFrontWind_20ms | Push Straight | 29.0° | **123.0** | 128.3 | 48.2 | 6754/0 | 12.3 |
| SeaLevelFrontWind_20ms | Push Hook | 27.5° | **126.7** | 132.5 | 45.5 | 6299/-1396 | -21.2 |
| SeaLevelFrontWind_20ms | Push Slice | 30.5° | **120.2** | 125.8 | 49.8 | 6889/1527 | 44.0 |
| SeaLevelFrontWind_20ms | Straight Hook | 26.0° | **130.7** | 137.1 | 43.1 | 6003/-1331 | -33.9 |
| SeaLevelFrontWind_20ms | Straight Slice | 29.0° | **123.5** | 129.2 | 47.7 | 6594/1462 | 33.1 |
| SeaLevelSideWind_10ms | Straight | 27.5° | **148.1** | 158.2 | 40.7 | 6452/0 | 7.4 |
| SeaLevelSideWind_10ms | Pull Straight | 26.0° | **149.9** | 160.2 | 38.7 | 6149/0 | -5.8 |
| SeaLevelSideWind_10ms | Pull Hook | 24.5° | **149.0** | 159.2 | 35.8 | 5708/-1265 | -35.3 |
| SeaLevelSideWind_10ms | Pull Slice | 27.5° | **149.6** | 160.2 | 40.4 | 6299/1396 | 23.8 |
| SeaLevelSideWind_10ms | Push Straight | 29.0° | **146.0** | 155.8 | 42.5 | 6754/0 | 20.2 |
| SeaLevelSideWind_10ms | Push Hook | 27.5° | **145.9** | 155.5 | 39.9 | 6299/-1396 | -8.8 |
| SeaLevelSideWind_10ms | Push Slice | 30.5° | **145.2** | 155.3 | 44.1 | 6889/1527 | 47.6 |
| SeaLevelSideWind_10ms | Straight Hook | 26.0° | **147.6** | 157.5 | 37.9 | 6003/-1331 | -22.1 |
| SeaLevelSideWind_10ms | Straight Slice | 29.0° | **147.6** | 157.9 | 42.3 | 6594/1462 | 36.1 |
| SeaLevelSideWind_20ms | Straight | 27.5° | **148.0** | 158.3 | 40.8 | 6452/0 | -14.9 |
| SeaLevelSideWind_20ms | Pull Straight | 26.0° | **152.2** | 163.3 | 38.2 | 6149/0 | -27.4 |
| SeaLevelSideWind_20ms | Pull Hook | 24.5° | **158.6** | 171.6 | 35.3 | 5708/-1265 | -56.0 |
| SeaLevelSideWind_20ms | Pull Slice | 27.5° | **143.9** | 153.3 | 39.8 | 6299/1396 | 1.5 |
| SeaLevelSideWind_20ms | Push Straight | 29.0° | **143.4** | 152.9 | 43.4 | 6754/0 | -2.9 |
| SeaLevelSideWind_20ms | Push Hook | 27.5° | **151.6** | 162.9 | 40.8 | 6299/-1396 | -31.6 |
| SeaLevelSideWind_20ms | Push Slice | 30.5° | **134.6** | 142.5 | 44.9 | 6889/1527 | 24.4 |
| SeaLevelSideWind_20ms | Straight Hook | 26.0° | **155.5** | 167.6 | 38.1 | 6003/-1331 | -43.8 |
| SeaLevelSideWind_20ms | Straight Slice | 29.0° | **139.5** | 148.1 | 42.4 | 6594/1462 | 13.4 |
| HighAltitude_NoWind | Straight | 27.5° | **168.8** | 181.4 | 38.4 | 6452/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 26.0° | **170.3** | 183.5 | 35.8 | 6149/0 | -14.8 |
| HighAltitude_NoWind | Pull Hook | 24.5° | **170.0** | 184.2 | 32.7 | 5708/-1265 | -43.2 |
| HighAltitude_NoWind | Pull Slice | 27.5° | **168.0** | 180.7 | 37.9 | 6299/1396 | 14.6 |
| HighAltitude_NoWind | Push Straight | 29.0° | **167.0** | 179.0 | 40.8 | 6754/0 | 14.6 |
| HighAltitude_NoWind | Push Hook | 27.5° | **168.0** | 180.7 | 37.9 | 6299/-1396 | -14.6 |
| HighAltitude_NoWind | Push Slice | 30.5° | **164.1** | 175.6 | 42.8 | 6889/1527 | 42.8 |
| HighAltitude_NoWind | Straight Hook | 26.0° | **169.5** | 182.8 | 35.3 | 6003/-1331 | -29.0 |
| HighAltitude_NoWind | Straight Slice | 29.0° | **166.4** | 178.5 | 40.4 | 6594/1462 | 29.1 |

---

## Club: 9i

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 31.1° | **133.0** | 142.0 | 40.3 | 7096/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 29.6° | **135.8** | 145.3 | 38.5 | 6801/0 | -11.8 |
| SeaLevelNoWind | Pull Hook | 28.1° | **137.8** | 147.8 | 36.1 | 6352/-1408 | -37.7 |
| SeaLevelNoWind | Pull Slice | 31.1° | **132.8** | 141.8 | 39.9 | 6928/1536 | 13.8 |
| SeaLevelNoWind | Push Straight | 32.6° | **130.1** | 138.7 | 42.1 | 7391/0 | 11.3 |
| SeaLevelNoWind | Push Hook | 31.1° | **132.8** | 141.8 | 39.9 | 6928/-1536 | -13.8 |
| SeaLevelNoWind | Push Slice | 34.1° | **126.8** | 135.0 | 43.4 | 7504/1664 | 34.9 |
| SeaLevelNoWind | Straight Hook | 29.6° | **135.4** | 144.9 | 38.1 | 6640/-1472 | -25.6 |
| SeaLevelNoWind | Straight Slice | 32.6° | **129.9** | 138.5 | 41.7 | 7216/1600 | 24.7 |
| SeaLevelBackWind_10ms | Straight | 31.1° | **140.6** | 151.8 | 38.0 | 7096/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 29.6° | **142.9** | 154.6 | 36.1 | 6801/0 | -11.9 |
| SeaLevelBackWind_10ms | Pull Hook | 28.1° | **144.2** | 156.3 | 33.8 | 6352/-1408 | -35.7 |
| SeaLevelBackWind_10ms | Pull Slice | 31.1° | **140.4** | 151.6 | 37.6 | 6928/1536 | 11.7 |
| SeaLevelBackWind_10ms | Push Straight | 32.6° | **138.0** | 148.6 | 39.7 | 7391/0 | 11.5 |
| SeaLevelBackWind_10ms | Push Hook | 31.1° | **140.4** | 151.6 | 37.6 | 6928/-1536 | -11.7 |
| SeaLevelBackWind_10ms | Push Slice | 34.1° | **134.7** | 144.9 | 41.1 | 7504/1664 | 33.2 |
| SeaLevelBackWind_10ms | Straight Hook | 29.6° | **142.4** | 154.0 | 35.7 | 6640/-1472 | -23.6 |
| SeaLevelBackWind_10ms | Straight Slice | 32.6° | **137.7** | 148.3 | 39.4 | 7216/1600 | 22.8 |
| SeaLevelBackWind_20ms | Straight | 31.1° | **146.7** | 160.1 | 35.8 | 7096/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 29.6° | **148.5** | 162.3 | 34.0 | 6801/0 | -12.0 |
| SeaLevelBackWind_20ms | Pull Hook | 28.1° | **148.9** | 163.2 | 31.7 | 6352/-1408 | -33.8 |
| SeaLevelBackWind_20ms | Pull Slice | 31.1° | **146.4** | 159.7 | 35.5 | 6928/1536 | 9.7 |
| SeaLevelBackWind_20ms | Push Straight | 32.6° | **144.5** | 157.3 | 37.6 | 7391/0 | 11.6 |
| SeaLevelBackWind_20ms | Push Hook | 31.1° | **146.4** | 159.7 | 35.5 | 6928/-1536 | -9.7 |
| SeaLevelBackWind_20ms | Push Slice | 34.1° | **141.3** | 153.5 | 39.0 | 7504/1664 | 31.6 |
| SeaLevelBackWind_20ms | Straight Hook | 29.6° | **147.7** | 161.5 | 33.6 | 6640/-1472 | -21.7 |
| SeaLevelBackWind_20ms | Straight Slice | 32.6° | **144.0** | 156.7 | 37.3 | 7216/1600 | 21.0 |
| SeaLevelFrontWind_10ms | Straight | 31.1° | **123.7** | 130.6 | 42.9 | 7096/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 29.6° | **126.9** | 134.2 | 41.0 | 6801/0 | -11.7 |
| SeaLevelFrontWind_10ms | Pull Hook | 28.1° | **130.0** | 137.9 | 38.6 | 6352/-1408 | -39.7 |
| SeaLevelFrontWind_10ms | Pull Slice | 31.1° | **123.6** | 130.6 | 42.4 | 6928/1536 | 16.0 |
| SeaLevelFrontWind_10ms | Push Straight | 32.6° | **120.5** | 127.0 | 44.7 | 7391/0 | 11.2 |
| SeaLevelFrontWind_10ms | Push Hook | 31.1° | **123.6** | 130.6 | 42.4 | 6928/-1536 | -16.0 |
| SeaLevelFrontWind_10ms | Push Slice | 34.1° | **117.4** | 123.8 | 46.0 | 7504/1664 | 36.7 |
| SeaLevelFrontWind_10ms | Straight Hook | 29.6° | **126.9** | 134.4 | 40.6 | 6640/-1472 | -27.8 |
| SeaLevelFrontWind_10ms | Straight Slice | 32.6° | **120.6** | 127.3 | 44.2 | 7216/1600 | 26.8 |
| SeaLevelFrontWind_20ms | Straight | 31.1° | **112.5** | 117.4 | 45.6 | 7096/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 29.6° | **116.2** | 121.4 | 43.7 | 6801/0 | -11.6 |
| SeaLevelFrontWind_20ms | Pull Hook | 28.1° | **120.6** | 126.7 | 41.2 | 6352/-1408 | -41.9 |
| SeaLevelFrontWind_20ms | Pull Slice | 31.1° | **112.7** | 117.8 | 45.1 | 6928/1536 | 18.5 |
| SeaLevelFrontWind_20ms | Push Straight | 32.6° | **109.1** | 113.6 | 47.4 | 7391/0 | 11.0 |
| SeaLevelFrontWind_20ms | Push Hook | 31.1° | **112.7** | 117.8 | 45.1 | 6928/-1536 | -18.5 |
| SeaLevelFrontWind_20ms | Push Slice | 34.1° | **106.5** | 111.3 | 48.6 | 7504/1664 | 38.7 |
| SeaLevelFrontWind_20ms | Straight Hook | 29.6° | **116.6** | 122.2 | 43.2 | 6640/-1472 | -30.1 |
| SeaLevelFrontWind_20ms | Straight Slice | 32.6° | **109.6** | 114.5 | 46.9 | 7216/1600 | 29.0 |
| SeaLevelSideWind_10ms | Straight | 31.1° | **133.0** | 142.1 | 40.4 | 7096/0 | 6.9 |
| SeaLevelSideWind_10ms | Pull Straight | 29.6° | **135.1** | 144.4 | 38.8 | 6801/0 | -5.0 |
| SeaLevelSideWind_10ms | Pull Hook | 28.1° | **134.9** | 144.1 | 36.4 | 6352/-1408 | -31.1 |
| SeaLevelSideWind_10ms | Pull Slice | 31.1° | **134.5** | 144.1 | 40.2 | 6928/1536 | 20.8 |
| SeaLevelSideWind_10ms | Push Straight | 32.6° | **130.8** | 139.6 | 41.9 | 7391/0 | 18.3 |
| SeaLevelSideWind_10ms | Push Hook | 31.1° | **131.2** | 139.9 | 39.8 | 6928/-1536 | -6.9 |
| SeaLevelSideWind_10ms | Push Slice | 34.1° | **130.0** | 139.0 | 43.3 | 7504/1664 | 41.9 |
| SeaLevelSideWind_10ms | Straight Hook | 29.6° | **133.1** | 142.0 | 38.1 | 6640/-1472 | -18.9 |
| SeaLevelSideWind_10ms | Straight Slice | 32.6° | **132.4** | 141.6 | 41.8 | 7216/1600 | 31.8 |
| SeaLevelSideWind_20ms | Straight | 31.1° | **132.8** | 142.2 | 40.6 | 7096/0 | -13.9 |
| SeaLevelSideWind_20ms | Pull Straight | 29.6° | **137.0** | 147.2 | 38.3 | 6801/0 | -25.2 |
| SeaLevelSideWind_20ms | Pull Hook | 28.1° | **143.7** | 155.6 | 35.9 | 6352/-1408 | -50.7 |
| SeaLevelSideWind_20ms | Pull Slice | 31.1° | **129.4** | 137.9 | 39.7 | 6928/1536 | 0.0 |
| SeaLevelSideWind_20ms | Push Straight | 32.6° | **128.3** | 136.9 | 42.8 | 7391/0 | -3.2 |
| SeaLevelSideWind_20ms | Push Hook | 31.1° | **136.2** | 146.4 | 40.7 | 6928/-1536 | -28.2 |
| SeaLevelSideWind_20ms | Push Slice | 34.1° | **120.2** | 127.2 | 44.0 | 7504/1664 | 20.3 |
| SeaLevelSideWind_20ms | Straight Hook | 29.6° | **140.1** | 151.1 | 38.3 | 6640/-1472 | -39.3 |
| SeaLevelSideWind_20ms | Straight Slice | 32.6° | **125.0** | 132.8 | 41.9 | 7216/1600 | 10.6 |
| HighAltitude_NoWind | Straight | 31.1° | **152.1** | 163.5 | 38.8 | 7096/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 29.6° | **154.1** | 166.0 | 36.7 | 6801/0 | -13.4 |
| HighAltitude_NoWind | Pull Hook | 28.1° | **155.1** | 167.7 | 34.0 | 6352/-1408 | -39.0 |
| HighAltitude_NoWind | Pull Slice | 31.1° | **151.8** | 163.2 | 38.4 | 6928/1536 | 12.5 |
| HighAltitude_NoWind | Push Straight | 32.6° | **149.9** | 160.6 | 40.9 | 7391/0 | 13.1 |
| HighAltitude_NoWind | Push Hook | 31.1° | **151.8** | 163.2 | 38.4 | 6928/-1536 | -12.5 |
| HighAltitude_NoWind | Push Slice | 34.1° | **146.9** | 157.2 | 42.5 | 7504/1664 | 37.5 |
| HighAltitude_NoWind | Straight Hook | 29.6° | **153.5** | 165.5 | 36.3 | 6640/-1472 | -25.7 |
| HighAltitude_NoWind | Straight Slice | 32.6° | **149.5** | 160.3 | 40.5 | 7216/1600 | 25.3 |

---

## Club: PW

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 34.6° | **117.5** | 125.5 | 38.7 | 7700/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 33.1° | **120.2** | 128.7 | 37.1 | 7412/0 | -10.5 |
| SeaLevelNoWind | Pull Hook | 31.6° | **122.4** | 131.4 | 35.2 | 6956/-1542 | -32.6 |
| SeaLevelNoWind | Pull Slice | 34.6° | **117.4** | 125.5 | 38.4 | 7517/1667 | 11.2 |
| SeaLevelNoWind | Push Straight | 36.1° | **114.6** | 122.2 | 40.2 | 7988/0 | 10.0 |
| SeaLevelNoWind | Push Hook | 34.6° | **117.4** | 125.5 | 38.4 | 7517/-1667 | -11.2 |
| SeaLevelNoWind | Push Slice | 37.6° | **111.7** | 118.9 | 41.3 | 8079/1791 | 29.7 |
| SeaLevelNoWind | Straight Hook | 33.1° | **120.0** | 128.5 | 36.8 | 7237/-1604 | -21.7 |
| SeaLevelNoWind | Straight Slice | 36.1° | **114.7** | 122.3 | 39.9 | 7798/1729 | 20.8 |
| SeaLevelBackWind_10ms | Straight | 34.6° | **124.4** | 134.5 | 36.5 | 7700/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 33.1° | **126.7** | 137.2 | 35.0 | 7412/0 | -10.6 |
| SeaLevelBackWind_10ms | Pull Hook | 31.6° | **128.3** | 139.3 | 33.1 | 6956/-1542 | -30.8 |
| SeaLevelBackWind_10ms | Pull Slice | 34.6° | **124.4** | 134.4 | 36.3 | 7517/1667 | 9.2 |
| SeaLevelBackWind_10ms | Push Straight | 36.1° | **122.0** | 131.5 | 38.0 | 7988/0 | 10.1 |
| SeaLevelBackWind_10ms | Push Hook | 34.6° | **124.4** | 134.4 | 36.3 | 7517/-1667 | -9.2 |
| SeaLevelBackWind_10ms | Push Slice | 37.6° | **118.8** | 127.8 | 39.2 | 8079/1791 | 28.2 |
| SeaLevelBackWind_10ms | Straight Hook | 33.1° | **126.3** | 136.8 | 34.7 | 7237/-1604 | -19.9 |
| SeaLevelBackWind_10ms | Straight Slice | 36.1° | **121.7** | 131.2 | 37.8 | 7798/1729 | 19.0 |
| SeaLevelBackWind_20ms | Straight | 34.6° | **130.0** | 142.1 | 34.6 | 7700/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 33.1° | **131.8** | 144.4 | 33.0 | 7412/0 | -10.6 |
| SeaLevelBackWind_20ms | Pull Hook | 31.6° | **132.6** | 145.6 | 31.2 | 6956/-1542 | -29.0 |
| SeaLevelBackWind_20ms | Pull Slice | 34.6° | **129.7** | 141.7 | 34.4 | 7517/1667 | 7.5 |
| SeaLevelBackWind_20ms | Push Straight | 36.1° | **127.8** | 139.3 | 36.1 | 7988/0 | 10.2 |
| SeaLevelBackWind_20ms | Push Hook | 34.6° | **129.7** | 141.7 | 34.4 | 7517/-1667 | -7.5 |
| SeaLevelBackWind_20ms | Push Slice | 37.6° | **124.7** | 135.5 | 37.4 | 8079/1791 | 26.7 |
| SeaLevelBackWind_20ms | Straight Hook | 33.1° | **131.5** | 144.0 | 32.8 | 7237/-1604 | -18.2 |
| SeaLevelBackWind_20ms | Straight Slice | 36.1° | **127.5** | 139.0 | 35.9 | 7798/1729 | 17.4 |
| SeaLevelFrontWind_10ms | Straight | 34.6° | **109.1** | 115.1 | 41.0 | 7700/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 33.1° | **112.1** | 118.5 | 39.5 | 7412/0 | -10.4 |
| SeaLevelFrontWind_10ms | Pull Hook | 31.6° | **115.2** | 122.2 | 37.5 | 6956/-1542 | -34.5 |
| SeaLevelFrontWind_10ms | Pull Slice | 34.6° | **109.0** | 115.1 | 40.7 | 7517/1667 | 13.3 |
| SeaLevelFrontWind_10ms | Push Straight | 36.1° | **105.8** | 111.5 | 42.5 | 7988/0 | 9.8 |
| SeaLevelFrontWind_10ms | Push Hook | 34.6° | **109.0** | 115.1 | 40.7 | 7517/-1667 | -13.3 |
| SeaLevelFrontWind_10ms | Push Slice | 37.6° | **103.0** | 108.5 | 43.6 | 8079/1791 | 31.3 |
| SeaLevelFrontWind_10ms | Straight Hook | 33.1° | **112.2** | 118.7 | 39.1 | 7237/-1604 | -23.8 |
| SeaLevelFrontWind_10ms | Straight Slice | 36.1° | **106.1** | 111.8 | 42.2 | 7798/1729 | 22.7 |
| SeaLevelFrontWind_20ms | Straight | 34.6° | **98.8** | 102.9 | 43.6 | 7700/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 33.1° | **102.2** | 106.7 | 42.0 | 7412/0 | -10.2 |
| SeaLevelFrontWind_20ms | Pull Hook | 31.6° | **106.4** | 111.7 | 40.0 | 6956/-1542 | -36.6 |
| SeaLevelFrontWind_20ms | Pull Slice | 34.6° | **98.9** | 103.2 | 43.2 | 7517/1667 | 15.6 |
| SeaLevelFrontWind_20ms | Push Straight | 36.1° | **95.5** | 99.3 | 45.0 | 7988/0 | 9.7 |
| SeaLevelFrontWind_20ms | Push Hook | 34.6° | **98.9** | 103.2 | 43.2 | 7517/-1667 | -15.6 |
| SeaLevelFrontWind_20ms | Push Slice | 37.6° | **93.0** | 97.0 | 46.1 | 8079/1791 | 33.2 |
| SeaLevelFrontWind_20ms | Straight Hook | 33.1° | **102.7** | 107.4 | 41.6 | 7237/-1604 | -25.9 |
| SeaLevelFrontWind_20ms | Straight Slice | 36.1° | **96.0** | 100.1 | 44.7 | 7798/1729 | 24.8 |
| SeaLevelSideWind_10ms | Straight | 34.6° | **117.5** | 125.6 | 38.7 | 7700/0 | 6.3 |
| SeaLevelSideWind_10ms | Pull Straight | 33.1° | **119.5** | 127.9 | 37.4 | 7412/0 | -4.2 |
| SeaLevelSideWind_10ms | Pull Hook | 31.6° | **119.7** | 127.9 | 35.4 | 6956/-1542 | -26.6 |
| SeaLevelSideWind_10ms | Pull Slice | 34.6° | **118.9** | 127.4 | 38.7 | 7517/1667 | 17.6 |
| SeaLevelSideWind_10ms | Push Straight | 36.1° | **115.3** | 123.2 | 40.0 | 7988/0 | 16.3 |
| SeaLevelSideWind_10ms | Push Hook | 34.6° | **115.9** | 123.7 | 38.2 | 7517/-1667 | -4.9 |
| SeaLevelSideWind_10ms | Push Slice | 37.6° | **114.2** | 122.2 | 41.2 | 8079/1791 | 36.0 |
| SeaLevelSideWind_10ms | Straight Hook | 33.1° | **117.9** | 125.9 | 36.8 | 7237/-1604 | -15.6 |
| SeaLevelSideWind_10ms | Straight Slice | 36.1° | **116.6** | 124.8 | 40.0 | 7798/1729 | 27.1 |
| SeaLevelSideWind_20ms | Straight | 34.6° | **117.3** | 125.6 | 38.9 | 7700/0 | -12.7 |
| SeaLevelSideWind_20ms | Pull Straight | 33.1° | **121.4** | 130.5 | 37.0 | 7412/0 | -22.7 |
| SeaLevelSideWind_20ms | Pull Hook | 31.6° | **127.6** | 138.2 | 35.1 | 6956/-1542 | -44.4 |
| SeaLevelSideWind_20ms | Pull Slice | 34.6° | **114.4** | 122.0 | 38.2 | 7517/1667 | -1.3 |
| SeaLevelSideWind_20ms | Push Straight | 36.1° | **113.0** | 120.7 | 40.8 | 7988/0 | -3.2 |
| SeaLevelSideWind_20ms | Push Hook | 34.6° | **120.1** | 129.2 | 39.1 | 7517/-1667 | -24.3 |
| SeaLevelSideWind_20ms | Push Slice | 37.6° | **105.7** | 111.9 | 41.8 | 8079/1791 | 16.4 |
| SeaLevelSideWind_20ms | Straight Hook | 33.1° | **124.1** | 134.0 | 37.1 | 7237/-1604 | -34.3 |
| SeaLevelSideWind_20ms | Straight Slice | 36.1° | **110.2** | 117.1 | 40.0 | 7798/1729 | 7.9 |
| HighAltitude_NoWind | Straight | 34.6° | **134.2** | 144.3 | 37.7 | 7700/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 33.1° | **136.4** | 147.0 | 35.9 | 7412/0 | -11.9 |
| HighAltitude_NoWind | Pull Hook | 31.6° | **137.8** | 149.0 | 33.7 | 6956/-1542 | -33.9 |
| HighAltitude_NoWind | Pull Slice | 34.6° | **134.0** | 144.1 | 37.4 | 7517/1667 | 10.1 |
| HighAltitude_NoWind | Push Straight | 36.1° | **131.8** | 141.3 | 39.5 | 7988/0 | 11.5 |
| HighAltitude_NoWind | Push Hook | 34.6° | **134.0** | 144.1 | 37.4 | 7517/-1667 | -10.1 |
| HighAltitude_NoWind | Push Slice | 37.6° | **129.1** | 138.1 | 40.9 | 8079/1791 | 32.0 |
| HighAltitude_NoWind | Straight Hook | 33.1° | **136.2** | 146.8 | 35.6 | 7237/-1604 | -22.0 |
| HighAltitude_NoWind | Straight Slice | 36.1° | **131.6** | 141.2 | 39.2 | 7798/1729 | 21.3 |

---

## Club: SW

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 42.9° | **86.7** | 92.4 | 34.6 | 9017/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 41.4° | **89.3** | 95.4 | 33.6 | 8741/0 | -7.8 |
| SeaLevelNoWind | Pull Hook | 39.9° | **91.7** | 98.2 | 32.3 | 8264/-1832 | -22.7 |
| SeaLevelNoWind | Pull Slice | 42.9° | **86.7** | 92.4 | 34.5 | 8804/1952 | 6.5 |
| SeaLevelNoWind | Push Straight | 44.4° | **84.1** | 89.3 | 35.7 | 9294/0 | 7.3 |
| SeaLevelNoWind | Push Hook | 42.9° | **86.7** | 92.4 | 34.5 | 8804/-1952 | -6.5 |
| SeaLevelNoWind | Push Slice | 45.9° | **81.4** | 86.2 | 36.5 | 9344/2071 | 20.0 |
| SeaLevelNoWind | Straight Hook | 41.4° | **89.3** | 95.4 | 33.4 | 8534/-1892 | -14.5 |
| SeaLevelNoWind | Straight Slice | 44.4° | **84.1** | 89.3 | 35.5 | 9074/2012 | 13.5 |
| SeaLevelBackWind_10ms | Straight | 42.9° | **92.3** | 99.6 | 33.0 | 9017/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 41.4° | **94.7** | 102.5 | 31.9 | 8741/0 | -7.9 |
| SeaLevelBackWind_10ms | Pull Hook | 39.9° | **96.6** | 104.8 | 30.7 | 8264/-1832 | -21.4 |
| SeaLevelBackWind_10ms | Pull Slice | 42.9° | **92.3** | 99.6 | 32.9 | 8804/1952 | 5.0 |
| SeaLevelBackWind_10ms | Push Straight | 44.4° | **89.8** | 96.7 | 34.1 | 9294/0 | 7.4 |
| SeaLevelBackWind_10ms | Push Hook | 42.9° | **92.3** | 99.6 | 32.9 | 8804/-1952 | -5.0 |
| SeaLevelBackWind_10ms | Push Slice | 45.9° | **87.1** | 93.4 | 35.0 | 9344/2071 | 18.9 |
| SeaLevelBackWind_10ms | Straight Hook | 41.4° | **94.5** | 102.3 | 31.8 | 8534/-1892 | -13.1 |
| SeaLevelBackWind_10ms | Straight Slice | 44.4° | **89.8** | 96.7 | 34.0 | 9074/2012 | 12.2 |
| SeaLevelBackWind_20ms | Straight | 42.9° | **96.9** | 105.9 | 31.6 | 9017/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 41.4° | **99.0** | 108.5 | 30.5 | 8741/0 | -7.9 |
| SeaLevelBackWind_20ms | Pull Hook | 39.9° | **100.3** | 110.2 | 29.2 | 8264/-1832 | -20.1 |
| SeaLevelBackWind_20ms | Pull Slice | 42.9° | **96.9** | 105.8 | 31.5 | 8804/1952 | 3.8 |
| SeaLevelBackWind_20ms | Push Straight | 44.4° | **94.6** | 103.0 | 32.7 | 9294/0 | 7.5 |
| SeaLevelBackWind_20ms | Push Hook | 42.9° | **96.9** | 105.8 | 31.5 | 8804/-1952 | -3.8 |
| SeaLevelBackWind_20ms | Push Slice | 45.9° | **91.8** | 99.7 | 33.7 | 9344/2071 | 17.9 |
| SeaLevelBackWind_20ms | Straight Hook | 41.4° | **98.7** | 108.2 | 30.4 | 8534/-1892 | -11.8 |
| SeaLevelBackWind_20ms | Straight Slice | 44.4° | **94.5** | 102.9 | 32.6 | 9074/2012 | 11.1 |
| SeaLevelFrontWind_10ms | Straight | 42.9° | **79.9** | 83.9 | 36.5 | 9017/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 41.4° | **82.6** | 86.9 | 35.4 | 8741/0 | -7.7 |
| SeaLevelFrontWind_10ms | Pull Hook | 39.9° | **85.5** | 90.4 | 34.1 | 8264/-1832 | -24.2 |
| SeaLevelFrontWind_10ms | Pull Slice | 42.9° | **80.0** | 84.1 | 36.3 | 8804/1952 | 8.2 |
| SeaLevelFrontWind_10ms | Push Straight | 44.4° | **77.1** | 80.8 | 37.5 | 9294/0 | 7.2 |
| SeaLevelFrontWind_10ms | Push Hook | 42.9° | **80.0** | 84.1 | 36.3 | 8804/-1952 | -8.2 |
| SeaLevelFrontWind_10ms | Push Slice | 45.9° | **74.5** | 78.1 | 38.3 | 9344/2071 | 21.3 |
| SeaLevelFrontWind_10ms | Straight Hook | 41.4° | **82.8** | 87.2 | 35.2 | 8534/-1892 | -16.0 |
| SeaLevelFrontWind_10ms | Straight Slice | 44.4° | **77.2** | 81.1 | 37.3 | 9074/2012 | 15.0 |
| SeaLevelFrontWind_20ms | Straight | 42.9° | **71.6** | 74.4 | 38.5 | 9017/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 41.4° | **74.6** | 77.6 | 37.5 | 8741/0 | -7.6 |
| SeaLevelFrontWind_20ms | Pull Hook | 39.9° | **78.3** | 81.8 | 36.2 | 8264/-1832 | -25.9 |
| SeaLevelFrontWind_20ms | Pull Slice | 42.9° | **71.8** | 74.7 | 38.3 | 8804/1952 | 10.0 |
| SeaLevelFrontWind_20ms | Push Straight | 44.4° | **68.6** | 71.2 | 39.5 | 9294/0 | 7.1 |
| SeaLevelFrontWind_20ms | Push Hook | 42.9° | **71.8** | 74.7 | 38.3 | 8804/-1952 | -10.0 |
| SeaLevelFrontWind_20ms | Push Slice | 45.9° | **66.4** | 69.1 | 40.2 | 9344/2071 | 22.8 |
| SeaLevelFrontWind_20ms | Straight Hook | 41.4° | **75.0** | 78.2 | 37.3 | 8534/-1892 | -17.8 |
| SeaLevelFrontWind_20ms | Straight Slice | 44.4° | **69.1** | 71.9 | 39.3 | 9074/2012 | 16.8 |
| SeaLevelSideWind_10ms | Straight | 42.9° | **86.6** | 92.3 | 34.7 | 9017/0 | 5.0 |
| SeaLevelSideWind_10ms | Pull Straight | 41.4° | **88.6** | 94.6 | 33.8 | 8741/0 | -2.7 |
| SeaLevelSideWind_10ms | Pull Hook | 39.9° | **89.6** | 95.6 | 32.5 | 8264/-1832 | -17.9 |
| SeaLevelSideWind_10ms | Pull Slice | 42.9° | **87.7** | 93.7 | 34.7 | 8804/1952 | 11.7 |
| SeaLevelSideWind_10ms | Push Straight | 44.4° | **84.5** | 89.9 | 35.6 | 9294/0 | 12.4 |
| SeaLevelSideWind_10ms | Push Hook | 42.9° | **85.8** | 91.2 | 34.4 | 8804/-1952 | -1.5 |
| SeaLevelSideWind_10ms | Push Slice | 45.9° | **83.2** | 88.6 | 36.5 | 9344/2071 | 25.1 |
| SeaLevelSideWind_10ms | Straight Hook | 41.4° | **87.7** | 93.4 | 33.4 | 8534/-1892 | -9.5 |
| SeaLevelSideWind_10ms | Straight Slice | 44.4° | **85.5** | 91.2 | 35.6 | 9074/2012 | 18.7 |
| SeaLevelSideWind_20ms | Straight | 42.9° | **86.4** | 92.3 | 34.8 | 9017/0 | -10.2 |
| SeaLevelSideWind_20ms | Pull Straight | 41.4° | **90.0** | 96.6 | 33.5 | 8741/0 | -17.6 |
| SeaLevelSideWind_20ms | Pull Hook | 39.9° | **95.3** | 103.2 | 32.2 | 8264/-1832 | -32.3 |
| SeaLevelSideWind_20ms | Pull Slice | 42.9° | **84.5** | 89.9 | 34.3 | 8804/1952 | -3.5 |
| SeaLevelSideWind_20ms | Push Straight | 44.4° | **82.5** | 87.8 | 36.1 | 9294/0 | -3.3 |
| SeaLevelSideWind_20ms | Push Hook | 42.9° | **88.4** | 94.8 | 35.0 | 8804/-1952 | -17.1 |
| SeaLevelSideWind_20ms | Push Slice | 45.9° | **76.9** | 81.1 | 36.9 | 9344/2071 | 9.4 |
| SeaLevelSideWind_20ms | Straight Hook | 41.4° | **91.9** | 99.1 | 33.7 | 8534/-1892 | -24.5 |
| SeaLevelSideWind_20ms | Straight Slice | 44.4° | **80.8** | 85.5 | 35.6 | 9074/2012 | 3.2 |
| HighAltitude_NoWind | Straight | 42.9° | **98.8** | 105.9 | 34.6 | 9017/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 41.4° | **101.1** | 108.7 | 33.4 | 8741/0 | -8.8 |
| HighAltitude_NoWind | Pull Hook | 39.9° | **103.1** | 111.3 | 31.9 | 8264/-1832 | -23.8 |
| HighAltitude_NoWind | Pull Slice | 42.9° | **98.7** | 105.8 | 34.5 | 8804/1952 | 5.8 |
| HighAltitude_NoWind | Push Straight | 44.4° | **96.2** | 102.8 | 35.8 | 9294/0 | 8.4 |
| HighAltitude_NoWind | Push Hook | 42.9° | **98.7** | 105.8 | 34.5 | 8804/-1952 | -5.8 |
| HighAltitude_NoWind | Push Slice | 45.9° | **93.6** | 99.7 | 36.9 | 9344/2071 | 21.6 |
| HighAltitude_NoWind | Straight Hook | 41.4° | **101.0** | 108.7 | 33.2 | 8534/-1892 | -14.7 |
| HighAltitude_NoWind | Straight Slice | 44.4° | **96.3** | 102.9 | 35.7 | 9074/2012 | 14.0 |

---

## Club: LW

| Météo | Coup | Launch Angle | Carry (m) | Total (m) | Apex (m) | Spin (B/S) | Déviation (m) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| SeaLevelNoWind | Straight | 46.3° | **70.7** | 75.4 | 29.3 | 9259/0 | 0.0 |
| SeaLevelNoWind | Pull Straight | 44.8° | **72.9** | 77.9 | 28.4 | 8993/0 | -6.4 |
| SeaLevelNoWind | Pull Hook | 43.3° | **74.9** | 80.4 | 27.4 | 8521/-1889 | -17.5 |
| SeaLevelNoWind | Pull Slice | 46.3° | **70.8** | 75.4 | 29.2 | 9039/2004 | 4.3 |
| SeaLevelNoWind | Push Straight | 47.8° | **68.5** | 72.8 | 30.1 | 9524/0 | 6.0 |
| SeaLevelNoWind | Push Hook | 46.3° | **70.8** | 75.4 | 29.2 | 9039/-2004 | -4.3 |
| SeaLevelNoWind | Push Slice | 49.3° | **66.1** | 70.1 | 30.8 | 9558/2119 | 15.3 |
| SeaLevelNoWind | Straight Hook | 44.8° | **72.9** | 78.0 | 28.3 | 8780/-1946 | -10.8 |
| SeaLevelNoWind | Straight Slice | 47.8° | **68.6** | 72.8 | 30.0 | 9298/2061 | 10.1 |
| SeaLevelBackWind_10ms | Straight | 46.3° | **75.0** | 81.1 | 28.0 | 9259/0 | 0.0 |
| SeaLevelBackWind_10ms | Pull Straight | 44.8° | **77.0** | 83.6 | 27.1 | 8993/0 | -6.4 |
| SeaLevelBackWind_10ms | Pull Hook | 43.3° | **78.7** | 85.7 | 26.1 | 8521/-1889 | -16.4 |
| SeaLevelBackWind_10ms | Pull Slice | 46.3° | **75.0** | 81.1 | 28.0 | 9039/2004 | 3.1 |
| SeaLevelBackWind_10ms | Push Straight | 47.8° | **73.0** | 78.6 | 28.9 | 9524/0 | 6.0 |
| SeaLevelBackWind_10ms | Push Hook | 46.3° | **75.0** | 81.1 | 28.0 | 9039/-2004 | -3.1 |
| SeaLevelBackWind_10ms | Push Slice | 49.3° | **70.6** | 75.7 | 29.6 | 9558/2119 | 14.4 |
| SeaLevelBackWind_10ms | Straight Hook | 44.8° | **77.0** | 83.5 | 27.0 | 8780/-1946 | -9.7 |
| SeaLevelBackWind_10ms | Straight Slice | 47.8° | **72.9** | 78.6 | 28.8 | 9298/2061 | 9.0 |
| SeaLevelBackWind_20ms | Straight | 46.3° | **78.5** | 86.1 | 26.9 | 9259/0 | 0.0 |
| SeaLevelBackWind_20ms | Pull Straight | 44.8° | **80.3** | 88.3 | 26.0 | 8993/0 | -6.4 |
| SeaLevelBackWind_20ms | Pull Hook | 43.3° | **81.5** | 90.0 | 25.0 | 8521/-1889 | -15.4 |
| SeaLevelBackWind_20ms | Pull Slice | 46.3° | **78.5** | 86.0 | 26.9 | 9039/2004 | 2.1 |
| SeaLevelBackWind_20ms | Push Straight | 47.8° | **76.6** | 83.6 | 27.8 | 9524/0 | 6.1 |
| SeaLevelBackWind_20ms | Push Hook | 46.3° | **78.5** | 86.0 | 26.9 | 9039/-2004 | -2.1 |
| SeaLevelBackWind_20ms | Push Slice | 49.3° | **74.3** | 80.8 | 28.6 | 9558/2119 | 13.6 |
| SeaLevelBackWind_20ms | Straight Hook | 44.8° | **80.2** | 88.2 | 26.0 | 8780/-1946 | -8.7 |
| SeaLevelBackWind_20ms | Straight Slice | 47.8° | **76.5** | 83.5 | 27.8 | 9298/2061 | 8.1 |
| SeaLevelFrontWind_10ms | Straight | 46.3° | **65.5** | 68.9 | 30.7 | 9259/0 | 0.0 |
| SeaLevelFrontWind_10ms | Pull Straight | 44.8° | **67.8** | 71.4 | 29.9 | 8993/0 | -6.3 |
| SeaLevelFrontWind_10ms | Pull Hook | 43.3° | **70.3** | 74.4 | 28.8 | 8521/-1889 | -18.8 |
| SeaLevelFrontWind_10ms | Pull Slice | 46.3° | **65.5** | 69.0 | 30.6 | 9039/2004 | 5.6 |
| SeaLevelFrontWind_10ms | Push Straight | 47.8° | **63.1** | 66.3 | 31.5 | 9524/0 | 5.9 |
| SeaLevelFrontWind_10ms | Push Hook | 46.3° | **65.5** | 69.0 | 30.6 | 9039/-2004 | -5.6 |
| SeaLevelFrontWind_10ms | Push Slice | 49.3° | **60.8** | 63.8 | 32.2 | 9558/2119 | 16.4 |
| SeaLevelFrontWind_10ms | Straight Hook | 44.8° | **68.0** | 71.7 | 29.7 | 8780/-1946 | -12.1 |
| SeaLevelFrontWind_10ms | Straight Slice | 47.8° | **63.1** | 66.4 | 31.4 | 9298/2061 | 11.3 |
| SeaLevelFrontWind_20ms | Straight | 46.3° | **58.9** | 61.2 | 32.4 | 9259/0 | 0.0 |
| SeaLevelFrontWind_20ms | Pull Straight | 44.8° | **61.4** | 64.0 | 31.5 | 8993/0 | -6.2 |
| SeaLevelFrontWind_20ms | Pull Hook | 43.3° | **64.6** | 67.6 | 30.5 | 8521/-1889 | -20.3 |
| SeaLevelFrontWind_20ms | Pull Slice | 46.3° | **59.1** | 61.5 | 32.2 | 9039/2004 | 7.2 |
| SeaLevelFrontWind_20ms | Push Straight | 47.8° | **56.4** | 58.5 | 33.1 | 9524/0 | 5.8 |
| SeaLevelFrontWind_20ms | Push Hook | 46.3° | **59.1** | 61.5 | 32.2 | 9039/-2004 | -7.2 |
| SeaLevelFrontWind_20ms | Push Slice | 49.3° | **54.4** | 56.5 | 33.8 | 9558/2119 | 17.7 |
| SeaLevelFrontWind_20ms | Straight Hook | 44.8° | **61.8** | 64.5 | 31.4 | 8780/-1946 | -13.6 |
| SeaLevelFrontWind_20ms | Straight Slice | 47.8° | **56.7** | 58.9 | 33.0 | 9298/2061 | 12.7 |
| SeaLevelSideWind_10ms | Straight | 46.3° | **70.7** | 75.4 | 29.3 | 9259/0 | 4.0 |
| SeaLevelSideWind_10ms | Pull Straight | 44.8° | **72.5** | 77.5 | 28.6 | 8993/0 | -2.3 |
| SeaLevelSideWind_10ms | Pull Hook | 43.3° | **73.4** | 78.4 | 27.5 | 8521/-1889 | -13.7 |
| SeaLevelSideWind_10ms | Pull Slice | 46.3° | **71.3** | 76.3 | 29.4 | 9039/2004 | 8.4 |
| SeaLevelSideWind_10ms | Push Straight | 47.8° | **68.8** | 73.3 | 30.0 | 9524/0 | 10.0 |
| SeaLevelSideWind_10ms | Push Hook | 46.3° | **70.0** | 74.5 | 29.1 | 9039/-2004 | -0.3 |
| SeaLevelSideWind_10ms | Push Slice | 49.3° | **67.5** | 71.8 | 30.8 | 9558/2119 | 19.4 |
| SeaLevelSideWind_10ms | Straight Hook | 44.8° | **71.7** | 76.4 | 28.3 | 8780/-1946 | -6.8 |
| SeaLevelSideWind_10ms | Straight Slice | 47.8° | **69.4** | 74.0 | 30.1 | 9298/2061 | 14.1 |
| SeaLevelSideWind_20ms | Straight | 46.3° | **70.5** | 75.3 | 29.4 | 9259/0 | -8.2 |
| SeaLevelSideWind_20ms | Pull Straight | 44.8° | **73.4** | 78.9 | 28.3 | 8993/0 | -14.2 |
| SeaLevelSideWind_20ms | Pull Hook | 43.3° | **77.6** | 84.3 | 27.4 | 8521/-1889 | -25.2 |
| SeaLevelSideWind_20ms | Pull Slice | 46.3° | **69.1** | 73.5 | 29.1 | 9039/2004 | -3.7 |
| SeaLevelSideWind_20ms | Push Straight | 47.8° | **67.2** | 71.5 | 30.5 | 9524/0 | -2.6 |
| SeaLevelSideWind_20ms | Push Hook | 46.3° | **71.9** | 77.2 | 29.6 | 9039/-2004 | -12.8 |
| SeaLevelSideWind_20ms | Push Slice | 49.3° | **62.6** | 66.2 | 31.2 | 9558/2119 | 6.8 |
| SeaLevelSideWind_20ms | Straight Hook | 44.8° | **74.9** | 80.9 | 28.5 | 8780/-1946 | -18.9 |
| SeaLevelSideWind_20ms | Straight Slice | 47.8° | **65.9** | 69.8 | 30.1 | 9298/2061 | 1.8 |
| HighAltitude_NoWind | Straight | 46.3° | **79.3** | 85.2 | 29.3 | 9259/0 | 0.0 |
| HighAltitude_NoWind | Pull Straight | 44.8° | **81.4** | 87.8 | 28.3 | 8993/0 | -7.1 |
| HighAltitude_NoWind | Pull Hook | 43.3° | **83.1** | 90.0 | 27.2 | 8521/-1889 | -18.2 |
| HighAltitude_NoWind | Pull Slice | 46.3° | **79.4** | 85.2 | 29.3 | 9039/2004 | 3.7 |
| HighAltitude_NoWind | Push Straight | 47.8° | **77.2** | 82.5 | 30.3 | 9524/0 | 6.7 |
| HighAltitude_NoWind | Push Hook | 46.3° | **79.4** | 85.2 | 29.3 | 9039/-2004 | -3.7 |
| HighAltitude_NoWind | Push Slice | 49.3° | **75.0** | 79.8 | 31.2 | 9558/2119 | 16.4 |
| HighAltitude_NoWind | Straight Hook | 44.8° | **81.3** | 87.7 | 28.2 | 8780/-1946 | -10.8 |
| HighAltitude_NoWind | Straight Slice | 47.8° | **77.2** | 82.6 | 30.2 | 9298/2061 | 10.3 |

---

