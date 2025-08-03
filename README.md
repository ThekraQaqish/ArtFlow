# 🎨 ArtFlow – Artistic Social Platform

ArtFlow is a creative social platform designed for artists and art lovers. It allows artists to showcase their artworks, connect with an audience, participate in weekly challenges, and engage with the community through comments, likes, and messages.

---

## 🚀 Live Preview
[deployment link]

---

## 📌 Features

- User registration and login (with role-based access: admin, artist, guest)
- Artist profile page with editable personal info and artwork showcase
- Upload artworks with multiple images, descriptions, and tags
- Public gallery with filters by type, artist, and popularity
- Like and comment system on artworks
- Weekly art challenges with user voting
- Direct messaging between users and artists
- Admin dashboard to manage weekly challenges

---

## 🎯 Goal & Vision

**Goal:**  
Create an artistic social platform that allows artists to share their work, interact with audiences, and express themselves through weekly themes.

**Vision:**  
To be the preferred destination for artists and art enthusiasts to connect and creatively exchange ideas.

---

## 🛠️ Tech Stack

**Frontend:** React  
**Backend:** Node.js + Express  
**Database:** PostgreSQL  
**Image Storage:** Local or AWS 
**Design Tool:** Figma  
**Authentication:** Role-based system (JWT)

---

## 🗃️ Database Tables

- `users` – User accounts with role, name, email, bio, image  
- `artworks` – Artwork info like title, type, description, price  
- `artwork_images` – Multiple images linked to each artwork  
- `weekly_challenges` – Challenge title, description, start/end date  
- `challenge_submissions` – Artwork submissions to weekly challenges  
- `likes` – Track users who liked each artwork  
- `comments` – User comments on artworks  
- `messages` – Private messages between users

---

## 🧭 Page Structure

| Page | Description |
|------|-------------|
| Landing Page | Introduction and call-to-action |
| Login / Register | User authentication |
| Home | Feed of artworks and latest challenges |
| Artworks Gallery | Browse and filter artworks |
| Artwork Details | View artwork with comments and likes |
| Upload Artwork | For artists to add new work |
| Artists List | Discover and browse artists |
| Artist Profile | Public profile and portfolio |
| Personal Info | Edit user information |
| Weekly Challenge | View, participate, and vote in challenges |
| Messages | Contact artists or check inbox |
| About | Project vision and story |
| Contact | General inquiries |
| 404 | Error page for invalid routes |
| Admin Dashboard | Manage weekly challenges |

---

## 📐 UI/UX Prototype

[Figma Wireframes](https://www.figma.com/proto/Hpa6KYHesT1pYn4o9IOIum/ArtFlow?node-id=0-1&t=XxBHao7qZ8sTT1qk-1)

---

## Planing

[Notion  Platform Project Plan](https://www.notion.so/ArtFlow-Platform-Project-Plan-243a759696f280318037db5bc4bb451c)
