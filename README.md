\# Hip Hop Roster 🎤🏆



A comprehensive tier-based ranking system for hip hop artists featuring detailed statistics, achievement badges, and professional player cards.



\## 🌟 Features



\- \*\*Tier-Based Rankings\*\*: S-Tier through F-Tier classification system

\- \*\*Comprehensive Stats\*\*: 8 rating categories (Lyricism, Flow, Creativity, Rhythm, Longevity, Impact, Delivery, Storytelling)

\- \*\*Achievement Badges\*\*: Unique badges for each artist's signature style

\- \*\*Premium Player Cards\*\*: Dynamic, tier-themed artist profiles

\- \*\*Admin Dashboard\*\*: Full CRUD operations for managing artists

\- \*\*Bulk Import\*\*: Upload JSON/CSV files to quickly populate the database

\- \*\*Responsive Design\*\*: Mobile-friendly interface built with Tailwind CSS



\## 🛠️ Tech Stack



\### Backend

\- \*\*Java 17\*\*

\- \*\*Spring Boot 3.x\*\*

\- \*\*Spring Data JPA\*\*

\- \*\*MySQL Database\*\*

\- \*\*Maven\*\*

\- \*\*Lombok\*\*



\### Frontend

\- \*\*React 18\*\*

\- \*\*Vite\*\*

\- \*\*React Router DOM\*\*

\- \*\*Axios\*\*

\- \*\*Tailwind CSS\*\*

\- \*\*Lucide React Icons\*\*



\## 📋 Prerequisites



Before you begin, ensure you have the following installed:

\- Java 17 or higher

\- Node.js 16 or higher

\- MySQL 8.0 or higher

\- Maven 3.6 or higher



\## 🚀 Getting Started



\### 1. Clone the Repository

```bash

git clone https://github.com/yourusername/hip-hop-roster.git

cd hip-hop-roster

```



\### 2. Database Setup



Create a MySQL database:

```sql

CREATE DATABASE hiphop\_roster;

```



Update database credentials in `src/main/resources/application.properties`:

```properties

spring.datasource.url=jdbc:mysql://localhost:3306/hiphop\_roster?createDatabaseIfNotExist=true

spring.datasource.username=your\_mysql\_username

spring.datasource.password=your\_mysql\_password

```



\### 3. Backend Setup



Navigate to the project root and run:

```bash

\# Install dependencies and build

mvn clean install



\# Run the Spring Boot application

mvn spring-boot:run

```



The backend will start on `http://localhost:8080`



\### 4. Frontend Setup



Navigate to the frontend directory:

```bash

cd frontend



\# Install dependencies

npm install



\# Start the development server

npm run dev

```



The frontend will start on `http://localhost:3001`



\## 🔑 Default Admin Credentials

```

Username: admin

Password: admin123

```



\*\*⚠️ Important\*\*: Change these credentials in production!



\## 📁 Project Structure

```

hip-hop-roster/

├── src/

│   ├── main/

│   │   ├── java/com/hiphop/roster/

│   │   │   ├── config/          # Security \& data initialization

│   │   │   ├── controller/      # REST API endpoints

│   │   │   ├── dto/             # Data transfer objects

│   │   │   ├── model/           # JPA entities

│   │   │   ├── repository/      # Data access layer

│   │   │   └── service/         # Business logic

│   │   └── resources/

│   │       └── application.properties

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   │   ├── admin/          # Admin dashboard \& forms

│   │   │   ├── artist/         # Artist detail views

│   │   │   ├── auth/           # Login component

│   │   │   ├── common/         # Navbar, SearchBar

│   │   │   ├── home/           # Homepage components

│   │   │   └── roster/         # Roster view \& cards

│   │   ├── services/           # API service layer

│   │   ├── utils/              # Utilities (tierColors)

│   │   ├── App.jsx

│   │   └── main.jsx

│   ├── package.json

│   └── vite.config.js

└── README.md

```



\## 🎯 API Endpoints



\### Artists



| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | `/api/artists` | Get all artists |

| GET | `/api/artists/{id}` | Get artist by ID |

| GET | `/api/artists/name/{name}` | Get artist by name |

| GET | `/api/artists/tier/{tier}` | Get artists by tier |

| POST | `/api/artists` | Create new artist |

| PUT | `/api/artists/{id}` | Update artist |

| DELETE | `/api/artists/{id}` | Delete artist |



\### Authentication



| Method | Endpoint | Description |

|--------|----------|-------------|

| POST | `/api/auth/login` | Admin login |



\### Bulk Import



| Method | Endpoint | Description |

|--------|----------|-------------|

| POST | `/api/bulk/import-json` | Import artists from JSON |

| POST | `/api/bulk/import-csv` | Import artists from CSV |



\## 📊 Data Format



\### Artist Object

```json

{

&nbsp; "name": "Artist Name",

&nbsp; "bio": "Artist biography...",

&nbsp; "lyricism": "A+",

&nbsp; "flow": "A+",

&nbsp; "creativity": "A",

&nbsp; "rhythm": "A",

&nbsp; "longevity": "A+",

&nbsp; "impact": "A+",

&nbsp; "delivery": "A+",

&nbsp; "storytelling": "A+",

&nbsp; "overallTier": "S",

&nbsp; "badges": \["Badge1", "Badge2", "Badge3"],

&nbsp; "profileImageUrl": "https://example.com/image.jpg",

&nbsp; "active": true

}

```



\### Grading System



\- \*\*Stats\*\*: A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F+, F, F-

\- \*\*Overall Tier\*\*: S, A, B, C, D, F



\## 💾 Bulk Import Format



\### JSON Format

```json

\[

&nbsp; {

&nbsp;   "name": "Eminem",

&nbsp;   "bio": "Marshall Bruce Mathers III...",

&nbsp;   "lyricism": "A+",

&nbsp;   "flow": "A+",

&nbsp;   "creativity": "A",

&nbsp;   "rhythm": "A",

&nbsp;   "longevity": "A+",

&nbsp;   "impact": "A+",

&nbsp;   "delivery": "A+",

&nbsp;   "storytelling": "A+",

&nbsp;   "overallTier": "S",

&nbsp;   "badges": \["Dictionary", "Lyrical Assassin", "Rap God"],

&nbsp;   "profileImageUrl": "https://example.com/eminem.jpg"

&nbsp; }

]

```



\### CSV Format

```csv

name,bio,lyricism,flow,creativity,rhythm,longevity,impact,delivery,storytelling,overallTier,badges,profileImageUrl

Eminem,Marshall Bruce Mathers III...,A+,A+,A,A,A+,A+,A+,A+,S,Dictionary;Lyrical Assassin;Rap God,https://example.com/eminem.jpg

```



\*\*Note\*\*: Use semicolons (;) to separate multiple badges in CSV format.



\## 🎨 Tier Colors



Each tier has a unique color scheme:



\- \*\*S-Tier\*\*: Gold/Yellow (Legendary)

\- \*\*A-Tier\*\*: Purple/Pink (Elite)

\- \*\*B-Tier\*\*: Blue/Cyan (Great)

\- \*\*C-Tier\*\*: Green/Emerald (Good)

\- \*\*D-Tier\*\*: Gray/Slate (Average)

\- \*\*F-Tier\*\*: Red (Below Average)



\## 🔒 Security



\- Simple authentication system for admin access

\- CORS enabled for frontend-backend communication

\- \*\*Production Note\*\*: Implement proper JWT authentication and BCrypt password hashing



\## 🚧 Future Enhancements



\- \[ ] User voting system

\- \[ ] Artist comparison tool

\- \[ ] Advanced search and filtering

\- \[ ] Social media integration

\- \[ ] Real-time ranking updates

\- \[ ] Mobile app

\- \[ ] Public API with rate limiting

\- \[ ] Artist submission system



\## 📝 Usage



\### Adding an Artist (Admin)



1\. Navigate to `/admin`

2\. Login with admin credentials

3\. Click "Add Artist" button

4\. Fill in the form with artist details

5\. Submit to add to roster



\### Bulk Import (Admin)



1\. Navigate to `/admin`

2\. Click "Bulk Import" button

3\. Choose JSON or CSV format

4\. Upload file or paste data

5\. Click "Import Artists"



\### Viewing the Roster



1\. Navigate to `/roster`

2\. Browse all artists

3\. Filter by tier using tier buttons

4\. Search by artist name

5\. Click on any artist card to view detailed stats



\## 🤝 Contributing



Contributions are welcome! Please follow these steps:



1\. Fork the repository

2\. Create a feature branch (`git checkout -b feature/AmazingFeature`)

3\. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4\. Push to the branch (`git push origin feature/AmazingFeature`)

5\. Open a Pull Request



\## 📄 License



This project is licensed under the MIT License - see the LICENSE file for details.



\## 👥 Authors



\- \*\*Your Name\*\* - \*Initial work\*



\## 🙏 Acknowledgments



\- Hip hop community for inspiration

\- Spring Boot and React communities

\- All contributing artists



\## 📞 Contact



For questions or support, please contact:

\- Email: your.email@example.com

\- GitHub: \[@yourusername](https://github.com/yourusername)



---



\*\*Built with ❤️ for Hip Hop Culture\*\*

