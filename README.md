# 📚 AttendU

## Overview

Attendance Tracker is a web application built with React that helps students track their class attendance across multiple subjects. It provides comprehensive insights into attendance percentages, remaining classes needed, and potential medical day requirements.

## 🌟 Features

### Subject Management
- Add multiple subjects
- Specify maximum hours and attended hours for each subject
- Delete subjects as needed

### Attendance Calculations
- Calculate attendance percentage for each subject
- Determine number of classes needed to reach 75% attendance
- Identify medical day requirements for subjects between 65-75% attendance

### Data Visualization
- Bar Chart showing hours breakdown per subject
- Pie Chart displaying attendance status (above/below 75%)

## 🚀 Technologies Used

- React
- Tailwind CSS
- Recharts (for data visualization)
- Lucide React (for icons)

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/aaryan4985/AttendU.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

## 💡 How to Use

1. **Add Subjects**: 
   - Enter subject name in the input field
   - Click "Add Subject" or press Enter

2. **Input Hours**:
   - For each subject, enter:
     - Maximum total hours for the subject
     - Hours you have attended

3. **Calculate Attendance**:
   - Click "Calculate Attendance" to see:
     - Attendance percentage
     - Remaining classes needed to reach 75%

4. **Medical Days**:
   - Click "Medical Days" to determine potential medical day applications for subjects between 65-75% attendance

## 📊 Visualization

The app provides two charts:
- **Hours Breakdown**: Compare attended vs. maximum hours
- **Attendance Overview**: Proportion of subjects above/below 75% attendance

## 🎨 Design

- Responsive design
- Dark gradient background
- Glassmorphism-style UI
- Animated interactions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🐞 Issues

Report any issues or suggest improvements by opening an issue in the GitHub repository.
