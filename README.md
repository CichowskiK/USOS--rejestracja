# 🎓 USOS — Rejestracja na zajęcia

Platforma modelowana na kształt USOS, skupiona na funkcjonalności rejestracji studentów na grupy zajęciowe.

---

## 🛠️ Wymagania

- Node.js >= 18
- PostgreSQL >= 14
- npm

---

## 🚀 Uruchomienie

### 1. Baza danych PostgreSQL

```bash
# Utwórz bazę danych
psql -U postgres -c "CREATE DATABASE nazwa_bazy;"

# Załaduj schemat
psql -U postgres -d nazwa_bazy -f schemat.sql
```

### 2. Backend

```bash
# Skopiuj i uzupełnij zmienne środowiskowe
cp .env.example .env

# Zainstaluj zależności
npm install

# Uruchom serwer
node index.js
```

Serwer startuje na: `http://localhost:${3000}`

---

## 🗃️ Schemat bazy danych

### Tabela `student`
| Kolumna | Typ | Opis |
|---------|-----|------|
| student_id | SERIAL PK | Klucz główny |
| imie | VARCHAR(255) NOT NULL | Imię |
| nazwisko | VARCHAR(255) NOT NULL | Nazwisko |
| login | VARCHAR(255) UNIQUE | Login |
| haslo | VARCHAR(255) | Hasło (bcrypt) |

### Tabela `kursy`
| Kolumna | Typ | Opis |
|---------|-----|------|
| kurs_id | SERIAL PK | Klucz główny |
| nazwa | VARCHAR(255) NOT NULL | Nazwa kursu |
|ects| INTEGER NOT NULL | ile ects ma kurs|

### Tabela `prowadzacy`
| Kolumna | Typ | Opis |
|---------|-----|------|
| prowadzacy_id | SERIAL PK | Klucz główny |
| imie | VARCHAR(255) | Imię |
| nazwisko | VARCHAR(255) | Nazwisko |

### Tabela `grupy`
| Kolumna | Typ | Opis |
|---------|-----|------|
| grup_id | SERIAL PK | Klucz główny |
| kurs_id | INTEGER FK | Relacja → kursy.kurs_id |
| prowadzacy_id | INTEGER FK | Relacja → prowadzacy.prowadzacy_id |
| wolne_miejsca | INTEGER | Liczba wolnych miejsc |
| zajecia_od | TIME | Godzina rozpoczęcia |
| zajecia_do | TIME | Godzina zakończenia |
| dzien_tygodnia | ENUM | Dzień tygodnia w który są zajęcia |

### Tabela `chodzi_na`
| Kolumna | Typ | Opis |
|---------|-----|------|
| student_id | INTEGER FK | Relacja → student.student_id |
| grup_id | INTEGER FK | Relacja → grupy.grup_id |

**Relacje:**
- `grupy.kurs_id` → `kursy.kurs_id` (ON DELETE CASCADE)
- `grupy.prowadzacy_id` → `prowadzacy.prowadzacy_id`
- `chodzi_na.student_id` → `student.student_id`
- `chodzi_na.grup_id` → `grupy.grup_id` (ON DELETE CASCADE)

---

## 📱 Widoki

| Ścieżka | Opis |
|---------|------|
| `/` | Strona logowania i rejestracji |
| `/home` | Strona główna — moje grupy |
| `/kursy` | Lista kursów |
| `/kursy/admin` | Panel zarządzania kursami |
| `/grupy/:id` | Grupy danego kursu — rejestracja |
| `/grupy/admin` | Panel zarządzania grupami |
| `/student` | Lista studentów |
| `/student/admin` | Panel zarządzania studentami |
| `/prowadzacy` | Lista prowadzących |
| `/prowadzacy/admin` | Panel zarządzania prowadzącymi |


---

## 🔧 Zmienne środowiskowe `.env`

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nazwa_bazy
DB_USER=postgres
DB_PASSWORD=twoje_haslo
SESSION_SECRET=dlugi-losowy-ciag-znakow
```