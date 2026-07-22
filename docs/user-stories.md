# Smooth Operator — User Stories

**Stand:** 2026-07-22  
**Fokus:** Customer Journey von anonymem Erstkontakt bis Operator-Zuordnung.

---

## Grundprinzip

> Vertrauen zuerst. Dann Geschwindigkeit. Dann Preis.

Der Kunde tippt nichts Eigenes ein, bevor er einen sicheren Account hat, die NDA geklärt ist und weiß, dass seine Daten nicht um die Welt geschickt werden.

---

## Phase 1 — Anonyme Selbsthilfe (kein Login)

### US-101 FAQ-Chatbot für anonyme Ersthilfe
**Als** Besucher mit einem technischen Problem,  
**will ich** mit einem Chatbot interagieren, der mit Smooth-Operator-Wissen geseedet ist,  
**damit** ich schnell herausfinde, ob mein Problem selbst lösbar ist oder professionelle Hilfe braucht.

**Akzeptanzkriterien:**
- Chatbot ist ohne Account erreichbar.
- Antworten basieren auf internem Wissen (Stack, Services, Preise, Prozesse).
- Bot erkennt sensible/individuelle Anfragen und bietet geschütztes Onboarding an.
- Keine personenbezogenen Daten oder Logs werden in dieser Phase erfasst.

### US-102 automatische Eskalation zum geschützten Bereich
**Als** Besucher,  
**will ich** vom Chatbot klar zum Onboarding geleitet werden, sobald mein Fall individuell wird,  
**damit** ich nicht aus Versehen sensible Daten in einen anonymen Kanal eingebe.

**Akzeptanzkriterien:**
- Triggerwörter/Szenarien erkennen: „Logs“, „Produktion“, „down“, „Kunde“, „Daten“, konkrete URLs/Credentials.
- Bot sagt: „Dafür brauchen wir einen geschützten Account + NDA. Hier geht's weiter.“
- Weiterleitung zur Registrierung.

---

## Phase 2 — Sicheres Onboarding

### US-201 Account erstellen
**Als** interessierter Kunde,  
**will ich** einen Account mit E-Mail und Passwort (oder SSO) anlegen,  
**damit** meine Cases, Verträge und Kommunikation geschützt sind.

**Akzeptanzkriterien:**
- E-Mail-Verifizierung.
- Passwort-Regeln (oder Magic Link).
- Kein Zugriff auf Case-Erstellung vor Verifizierung.

### US-202 AGB akzeptieren
**Als** neuer Kunde,  
**will ich** die Allgemeinen Geschäftsbedingungen sehen und akzeptieren,  
**damit** beide Seiten die Spielregeln kennen.

**Akzeptanzkriterien:**
- AGB als eigener Schritt im Onboarding.
- Zeitstempel der Akzeptanz wird gespeichert.
- Ohne Akzeptanz kein Case-Erstellen möglich.

### US-203 kurze NDA akzeptieren
**Als** neuer Kunde,  
**will ich** eine kurze, verständliche NDA digital akzeptieren,  
**damit** ich sicher meine internen Systemdaten teilen kann.

**Akzeptanzkriterien:**
- NDA ist maximal 1 Seite, keine Juristen-Sprache.
- Beide Parteien: IT-Rockstars Services S.L. und Kundenfirma.
- Signatur/Akzeptanz wird mit Zeitstempel gespeichert.
- NDA ist Voraussetzung für Case-Erstellung.

### US-204 Datensicherheitsversprechen
**Als** Kunde,  
**will ich** explizit sehen, dass meine Daten in der EU/in der ITR-Infrastruktur bleiben,  
**damit** ich keine Angst vor Datenexport in Drittstaaten habe.

**Akzeptanzkriterien:**
- Sichtbarer Block im Onboarding und in den Einstellungen.
- Versprechen: Operator-AI läuft in ITR-Rechenzentrum (AWS Bedrock), Logs/Dateien nur in eu-central-1, keine Weitergabe an Dritte.
- Verweis auf DPA/AVV bei Bedarf.

---

## Phase 3 — Case erstellen

### US-301 Problem beschreiben
**Als** eingeloggter Kunde,  
**will ich** mein Problem strukturiert beschreiben (Titel, Beschreibung, Betroffene Systeme, Dringlichkeit),  
**damit** der Operator schnell einschätzen kann, was brennt.

**Akzeptanzkriterien:**
- Pflichtfelder: Titel, Beschreibung, Dringlichkeit.
- Optional: betroffene Services (K8s, AWS, Azure, CI/CD, Monitoring, Auth, etc.).
- Speichern als Entwurf möglich.

### US-302 Logs und Screenshots hochladen
**Als** Kunde,  
**will ich** unter NDA-Sicherheit Logs, Screenshots oder kurze Videos hochladen,  
**damit** der Operator nicht blind arbeitet.

**Akzeptanzkriterien:**
- Upload nur nach NDA-Akzeptanz.
- Dateien landen verschlüsselt in eu-central-1 S3.
- Automatische Viren-/Malware-Prüfung (optional).
- Maximale Dateigröße und erlaubte Formate sichtbar.

### US-303 Reaktionszeit wählen
**Als** Kunde,  
**will ich** aus verschiedenen Reaktionszeit-Stufen wählen,  
**damit** ich Preis und Geschwindigkeit an meine Dringlichkeit anpassen kann.

**Akzeptanzkriterien:**
- Stufen z.B.:
  - 4h Standard
  - 1h Express (+50%)
  - 30min Priority (+100%)
  - 15min Emergency (+200%)
- Preis und Verfügbarkeit werden vor Auswahl angezeigt.
- Wenn Operatoren ausgebucht: Warteliste oder niedrigere Stufe vorschlagen.

### US-304 Kapazitätsprüfung / Demand Stop
**Als** Kunde,  
**will ich** vor dem Kauf sehen, ob ein Operator für meine gewählte Reaktionszeit verfügbar ist,  
**damit** ich nicht für etwas bezahle, was nicht geliefert werden kann.

**Akzeptanzkriterien:**
- Live-Kapazitätsanzeige pro Stufe.
- Bei 0 Kapazität: Checkout-Button deaktiviert, Warteliste angeboten.
- Kapazität wird aus dem Operator-Status (Telegram-Bot) gespeist.

---

## Phase 4 — Bezahlung

### US-401 Credits kaufen
**Als** Kunde,  
**will ich** über Stripe Checkout Credit-Pakete kaufen,  
**damit** die Reaktionszeit-Garantie greift.

**Akzeptanzkriterien:**
- Stripe Checkout Session.
- Pakete: Starter (1 Credit), Growth (5 Credits), Scale (15 Credits).
- Credits werden dem Account gutgeschrieben.
- Rechnung an hinterlegte E-Mail.

### US-402 Preisschätzung pro Fall
**Als** Kunde,  
**will ich** eine Schätzung sehen, wie viele Credits mein Fall voraussichtlich kostet,  
**damit** ich keine Budget-Überraschung erlebe.

**Akzeptanzkriterien:**
- Schätzung basiert auf Problem-Typ und Reaktionszeit.
- Hinweis: endgültiger Verbrauch kann abweichen.
- Verbrauch wird transparent im Dashboard dargestellt.

---

## Phase 5 — Operator-Zuordnung

### US-501 Case an verfügbare Operatoren pushen
**Als** System,  
**will ich** einen neuen Case automatisch an verfügbare Operatoren via Telegram-Bot pushen,  
**damit** schnell jemand reagiert.

**Akzeptanzkriterien:**
- Push enthält: Case-ID, Titel, Dringlichkeit, Reaktionszeit, Link.
- Mehrere Operatoren gleichzeitig benachrichtigt (First-Accept-Win).
- Niemand sieht Kundendaten vor Annahme außer Titel/Dringlichkeit.

### US-502 Operator nimmt Case an
**Als** Operator,  
**will ich** einen Case annehmen oder ablehnen können,  
**damit** ich nur Fälle übernehme, die zu meiner Kapazität und meinen Skills passen.

**Akzeptanzkriterien:**
- Annahme setzt meinen Status auf „beschäftigt“.
- Andere Operatoren sehen den Case nicht mehr.
- Kunde bekommt Benachrichtigung: „[Name] hat Ihren Case angenommen.“

### US-503 Kunde sieht Mission-Status
**Als** Kunde,  
**will ich** in meinem Dashboard sehen: Operator-Name, Status, verbleibende Credits, geschätzte Reaktionszeit,  
**damit** ich das Gefühl habe, Kontrolle zu haben.

**Akzeptanzkriterien:**
- Status: Offen → Angenommen → In Arbeit → Gelöst → Abgenommen.
- Echtzeit-Updates (WebSocket oder Polling).
- Verbleibende Credits werden nach jeder Aktion aktualisiert.

---

## Phase 6 — Kommunikation während der Mission

### US-601 Dateien nachreichen
**Als** Kunde,  
**will ich** während einer laufenden Mission weitere Logs oder Screenshots hochladen,  
**damit** der Operator alle nötigen Informationen bekommt.

**Akzeptanzkriterien:**
- Upload direkt im Case-Chat/Dashboard.
- Dateien werden dem Case zugeordnet.

### US-602 Kommunikation im geschützten Kanal
**Als** Kunde,  
**will ich** mit meinem Operator sicher kommunizieren (Chat im Dashboard oder Telegram-Thread),  
**damit** keine sensiblen Daten über unsichere Kanäle laufen.

**Akzeptanzkriterien:**
- Nachrichten verschlüsselt gespeichert.
- Zugriff nur für Kunde und zugewiesenen Operator (plus Eskalation).

---

## Phase 7 — Abschluss und Proof of Value

### US-701 Lösungsreport erhalten
**Als** Kunde,  
**will ich** einen Abschlussreport bekommen: Problem, Diagnose, Lösung, Abnahmekriterien,  
**damit** ich es intern nachweisen und reproduzieren kann.

**Akzeptanzkriterien:**
- Report wird automatisch aus Case-Daten generiert.
- Enthält: Ausgangslage, durchgeführte Schritte, Ergebnis, offene Todo's.

### US-702 Abnahme durch Kunden
**Als** Kunde,  
**will ich** die Abnahmekriterien bestätigen oder reklamieren,  
**damit** ich nicht für Halbheiten bezahle.

**Akzeptanzkriterien:**
- Kunde kann „Abgenommen“ oder „Nicht gelöst“ klicken.
- Bei Nicht-Abnahme: Eskalation an Rainer / zweiter Operator.
- Credits werden erst bei Abnahme vom Konto abgezogen.

### US-703 Operator bewerten
**Als** Kunde,  
**will ich** den Operator nach Abschluss bewerten,  
**damit** gute Arbeit sichtbar wird und schlechte gefiltert wird.

**Akzeptanzkriterien:**
- Sterne-Bewertung + optionales Feedback.
- Bewertung fließt in Operator-Reputation ein.

---

## Nicht-funktionale Anforderungen

| ID | Anforderung |
|----|-------------|
| NFA-101 | Alle Kundendaten bleiben in eu-central-1 (S3, DynamoDB, Bedrock). |
| NFA-102 | Keine Weitergabe von Kundendaten an externe AI-Modelle außerhalb ITR-Infrastruktur. |
| NFA-103 | NDA und AGB müssen vor Case-Erstellung akzeptiert sein. |
| NFA-104 | Reaktionszeit-Stufen müssen transparent mit Preis und Verfügbarkeit angezeigt werden. |
| NFA-105 | Kapazitätsprüfung muss Echtzeit-Operator-Status berücksichtigen. |
| NFA-106 | Jede Bezahlung muss mit Stripe-Quittung und interner Credit-Gutschrift verknüpft sein. |

---

## Nächste Umsetzungspriorität

1. Landing Page: Trust-Blöcke (NDA, EU-Daten, Bedrock-only) oben ergänzen.
2. Anonymer FAQ-Chatbot mit Eskalations-Logik.
3. Onboarding-Flow: Account → AGB → NDA → Datenschutz.
4. Case-Erstellung mit Reaktionszeit-Stufen und Kapazitätsprüfung.
5. Telegram-Bot für Operator-Zuordnung.
6. Stripe Checkout für Credit-Kauf.
7. Kunden-Dashboard für Mission-Status.
8. Proof-of-Value-Report und Abnahme-Flow.
