# Jory Medical Centre (مركز جوري الطبي)

A modern, responsive, bilingual (English & Arabic with full RTL support) website for **Jory Medical Centre** located in Al Khan, Sharjah, UAE.

## Features
- **Bilingual Support (EN / AR)**: Full bidirectional support with English (LTR) and Arabic (RTL) across all pages with custom typography (Cairo & Inter).
- **Responsive Hero Carousel**: 6-service dynamic hero showcase with trust badges and appointment CTA.
- **Service Showcase**: Dedicated sections for Dental Care, Dermatology & Aesthetics, Laser Treatments, Hair Treatments, General Practice, and Laboratory testing.
- **Autoplay Video Showcase**: Embedded ambient clinic showcase video with seamless looping and mobile optimization.
- **Doctor Profiles**: Detailed doctor and specialist profiles with specialties and booking options.
- **Interactive Gallery & Contact**: Filterable image gallery, interactive Google Maps embed, and direct WhatsApp / call booking.

## Tech Stack
- HTML5 / CSS3 (Tailwind CSS + Custom CSS Variables)
- Vanilla JavaScript
- Font Awesome 6
- Google Fonts (`Inter` & `Cairo`)

## Pages
| English | Arabic (RTL) | Description |
|---|---|---|
| `index.html` | `index-ar.html` | Homepage with hero carousel, services, video showcase, and trust badges |
| `about.html` | `about-ar.html` | About the clinic, mission, vision, and facilities |
| `services.html` | `services-ar.html` | Detailed medical and aesthetic services breakdown |
| `doctors.html` | `doctors-ar.html` | Medical team profiles and specialties |
| `gallery.html` | `gallery-ar.html` | Clinic interior, treatment rooms, and equipment |
| `contact.html` | `contact-ar.html` | Contact details, booking form, location map, and hours |

## Local Development
To run the website locally:
```bash
# Using Python
python -m http.server 8080

# Or with Node.js
npx serve .
```
Visit `http://localhost:8080` in your browser.
