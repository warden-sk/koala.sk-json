# Súbory

[Súbor](#tree-json) vytvorený z viacerých koncových bodov služby `istour` prostredníctvom zložitého algoritmu.

## destinations `JSON`

  `25` destinácií

```
  1. (160) Alanya
  2. (594) Antalya
  3. (3682) Ayia Napa
  4. (595) Belek
  5. (1956) Colakli
  6. (62) Cyprus 🧭
  7. (3687) Dahar
  8. (68) Egypt 🧭
  9. (77) Francúzsko 🧭
  10. (103) Hurghada
  11. (1969) Istanbul
  12. (76) Izrael 🧭
  13. (3820) Jordánsko 🧭
  14. (1954) Kizilot
  15. (1955) Lara
  16. (3772) Libanon 🧭
  17. (596) Makadi Bay
  18. (1947) Okurcalar
  19. (69) Portugalsko 🧭
  20. (3727) Protaras
  21. (1915) Sahl Hasheesh
  22. (158) Side
  23. (105) Soma Bay
  24. (78) Taliansko 🧭
  25. (72) Turecko 🧭
```

## hotels `JSON`

  `34` hotelov

```
  1. (1758) Adora Resort (11 termínov) 🆕 ******
  2. (166) Alba Queen (29 termínov) ******
  3. (165) Alba Resort (20 termínov) ******
  4. (170) Alba Royal (18 termínov) ******
  5. (1560) Belconti Resort (27 termínov) ******
  6. (1608) Caribbean World Soma Bay (16 termínov) *****
  7. (162) Club Calimera Serra Palace (18 termínov) ******
  8. (1598) Constantinos the Great (130 termínov) *****+
  9. (304) Delphin Imperial (18 termínov) ******
  10. (1676) Desert Rose (32 termínov) *****
  11. (1677) Dome Beach (104 termínov) ****+
  12. (192) Fatima a Santiago de Compostela  - pútnický zájazd (2 termíny) ***
  13. (1674) Golden Beach Resort (8 termínov) *****
  14. (1678) Chrysomare Beach Hotel & Resort (130 termínov) *****+
  15. (1551) Istanbul De Luxe - poznávací zájazd (4 termíny) ***
  16. (190) Izrael a Mŕtve more - pútnický zájazd letecky (4 termíny) ***
  17. (183) Izrael a Mŕtve more De Luxe - poznávací zájazd (2 termíny) ***
  18. (189) Izrael a Petra De Luxe - poznávací zájazd (4 termíny) ***
  19. (1767) Jordánsko a jeho skvosty De Luxe - poznávací zájazd (4 termíny) ***
  20. (157) Justiniano Park Conti (18 termínov) *****+
  21. (1589) Limak Lara De Luxe (9 termínov) ******
  22. (348) Nubia Aqua Beach Resort (16 termínov) *****
  23. (1775) Palm Beach Resort & Spa (24 termínov) 🆕 *****
  24. (173) Paríž KLASIK - poznávací zájazd (3 termíny) ***
  25. (257) Po stopách sv. pátra Pia - pútnický zájazd (2 termíny) ***
  26. (178) Rím De Luxe - poznávací zájazd (2 termíny) ***
  27. (177) Rím KLASIK - poznávací zájazd (2 termíny) **
  28. (1646) Sea Star Beau Rivage (8 termínov) *****
  29. (153) Serra Garden (18 termínov) *****
  30. (1675) Stella Di Mare Beach Resort & Spa (32 termínov) *****
  31. (1626) Sv. Charbel a Libanon - pútnický zájazd (2 termíny) ***
  32. (1588) Swandor Topkapi Palace (27 termínov) ******
  33. (1642) Tropitel Sahl Hasheesh (32 termínov) ******
  34. (1703) Vrissiana Beach (125 termínov) *****
```

## tree `JSON`

```
  1. (62) Cyprus 🧭
    1. (3682) Ayia Napa (2 hotely)
      I. (1677) Dome Beach (104 termínov) ****+
      II. (1678) Chrysomare Beach Hotel & Resort (130 termínov) *****+
    2. (3727) Protaras (2 hotely)
      I. (1598) Constantinos the Great (130 termínov) *****+
      II. (1703) Vrissiana Beach (125 termínov) *****
  2. (68) Egypt 🧭
    1. (103) Hurghada (4 hotely)
      I. (1676) Desert Rose (32 termínov) *****
      II. (1674) Golden Beach Resort (8 termínov) *****
      III. (348) Nubia Aqua Beach Resort (16 termínov) *****
      IV. (1775) Palm Beach Resort & Spa (24 termínov) 🆕 *****
      1. (3687) Dahar (1 hotel)
        I. (1646) Sea Star Beau Rivage (8 termínov) *****
    2. (596) Makadi Bay (1 hotel)
      I. (1675) Stella Di Mare Beach Resort & Spa (32 termínov) *****
    3. (1915) Sahl Hasheesh (1 hotel)
      I. (1642) Tropitel Sahl Hasheesh (32 termínov) ******
    4. (105) Soma Bay (1 hotel)
      I. (1608) Caribbean World Soma Bay (16 termínov) *****
  3. (77) Francúzsko (1 hotel) 🧭
    I. (173) Paríž KLASIK - poznávací zájazd (3 termíny) ***
  4. (76) Izrael (3 hotely) 🧭
    I. (190) Izrael a Mŕtve more - pútnický zájazd letecky (4 termíny) ***
    II. (183) Izrael a Mŕtve more De Luxe - poznávací zájazd (2 termíny) ***
    III. (189) Izrael a Petra De Luxe - poznávací zájazd (4 termíny) ***
  5. (3820) Jordánsko (1 hotel) 🧭
    I. (1767) Jordánsko a jeho skvosty De Luxe - poznávací zájazd (4 termíny) ***
  6. (3772) Libanon (1 hotel) 🧭
    I. (1626) Sv. Charbel a Libanon - pútnický zájazd (2 termíny) ***
  7. (69) Portugalsko (1 hotel) 🧭
    I. (192) Fatima a Santiago de Compostela  - pútnický zájazd (2 termíny) ***
  8. (78) Taliansko (3 hotely) 🧭
    I. (257) Po stopách sv. pátra Pia - pútnický zájazd (2 termíny) ***
    II. (178) Rím De Luxe - poznávací zájazd (2 termíny) ***
    III. (177) Rím KLASIK - poznávací zájazd (2 termíny) **
  9. (72) Turecko 🧭
    1. (160) Alanya
      1. (1947) Okurcalar (1 hotel)
        I. (157) Justiniano Park Conti (18 termínov) *****+
    2. (594) Antalya
      1. (1955) Lara (3 hotely)
        I. (304) Delphin Imperial (18 termínov) ******
        II. (1589) Limak Lara De Luxe (9 termínov) ******
        III. (1588) Swandor Topkapi Palace (27 termínov) ******
    3. (595) Belek (2 hotely)
      I. (1758) Adora Resort (11 termínov) 🆕 ******
      II. (1560) Belconti Resort (27 termínov) ******
    4. (1969) Istanbul (1 hotel)
      I. (1551) Istanbul De Luxe - poznávací zájazd (4 termíny) ***
    5. (158) Side (1 hotel)
      I. (153) Serra Garden (18 termínov) *****
      1. (1956) Colakli (3 hotely)
        I. (166) Alba Queen (29 termínov) ******
        II. (165) Alba Resort (20 termínov) ******
        III. (170) Alba Royal (18 termínov) ******
      2. (1954) Kizilot (1 hotel)
        I. (162) Club Calimera Serra Palace (18 termínov) ******
```
