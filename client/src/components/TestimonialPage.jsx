// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Rating,
//   IconButton,
// } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useSelector } from "react-redux";

// const testimonialsData = [
//   {
//     id: 1,
//     name: "Sumit Handa",
//     role: "COO",
//     company: "People Combine Educational Initiatives",
//     testimonial:
//       "It was a pleasure to work with Rajiv and Bhakti for the launch of Oakridge International School in Bangalore. With them around.",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     role: "CEO",
//     company: "Example Corp",
//     testimonial:
//       "Their event management skills are top-notch! They organized our annual conference with such precision. Highly recommended.",
//     rating: 4.5,
//   },
//   {
//     id: 3,
//     name: "Jane Smith",
//     role: "Marketing Director",
//     company: "Tech Innovations",
//     testimonial:
//       "Working with DreamCraft was an absolute pleasure. Their attention to detail and professionalism made our product launch seamless.",
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     name: "Alice Brown",
//     role: "Event Coordinator",
//     company: "BrightFuture",
//     testimonial:
//       "Rajiv and his team did a fantastic job organizing our charity gala. Everything went smoothly, and our guests had a great time!",
//     rating: 5,
//   },
//   {
//     id: 5,
//     name: "Michael Scott",
//     role: "Regional Manager",
//     company: "Dunder Mifflin",
//     testimonial:
//       "The event was incredibly well organized and went off without a hitch!",
//     rating: 4.9,
//   },
//   // Add more testimonials here
// ];

// const TestimonialPage = () => {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const totalTestimonials = testimonialsData.length;

//   const handlePrev = () => {
//     if (currentTestimonial > 0) {
//       setCurrentTestimonial((prev) => prev - 3);
//     }
//   };

//   const handleNext = () => {
//     if (currentTestimonial < totalTestimonials - 3) {
//       setCurrentTestimonial((prev) => prev + 3);
//     }
//   };

//   // Access the dark mode state from Redux
//   const isDarkMode = useSelector((state) => state.darkMode);

//   return (
//     <Box
//       sx={{
//         textAlign: "center",
//         px: { xs: 2, sm: 4, md: 8 },
//         py: { xs: 2, sm: 4, md: 5 },
//         backgroundColor: isDarkMode ? 'grey.900' : '',
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//       }}
//     >
//       <Typography
//         variant="h4"
//         sx={{
//           marginBottom: "20px",
//           color: isDarkMode ? "#ff4081" : "#e91e63",
//         }}
//       >
//         Testimonials
//       </Typography>

//       {/* Slider content */}
//       <Box
//         sx={{
//           display: "flex",
//           overflow: "hidden",
//           alignItems: "flex-start",
//           height: '300px',
//           transition: 'transform 0.5s ease', 
//           transform: `translateX(-${(currentTestimonial / 1) * 100}%)`, 
//         }}
//       >
//         {testimonialsData.map((testimonial) => (
//           <Box
//             key={testimonial.id}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               width: "33.33%",
//               padding: "20px",
//               backgroundColor: isDarkMode ? "#616161" : "#fff",
//               borderRadius: "8px",
//               margin: "0 10px",
//             }}
//           >
//             <Box sx={{ textAlign: 'left' }}>
//               <Rating value={testimonial.rating} precision={0.5} readOnly />
//               <Typography
//                 variant="body1"
//                 sx={{
//                   margin: "10px 0",
//                   fontStyle: "italic",
//                   color: isDarkMode ? "#ccc" : "#000",
//                 }}
//               >
//                 "{testimonial.testimonial}"
//               </Typography>
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: "bold", color: isDarkMode ? "#fff" : "#000" }}
//               >
//                 {testimonial.name}, {testimonial.role}
//               </Typography>
//               <Typography variant="body2" sx={{ color: isDarkMode ? "#b0bec5" : "#666" }}>
//                 {testimonial.company}
//               </Typography>
//             </Box>
//           </Box>
//         ))}
//       </Box>

//       {/* Navigation controls */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
//         <IconButton onClick={handlePrev} disabled={currentTestimonial === 0}>
//           <ArrowBackIosIcon sx={{ color: isDarkMode ? "#ff4081" : "#e91e63" }} />
//         </IconButton>

//         <IconButton onClick={handleNext} disabled={currentTestimonial >= totalTestimonials - 3}>
//           <ArrowForwardIosIcon sx={{ color: isDarkMode ? "#ff4081" : "#e91e63" }} />
//         </IconButton>
//       </Box>

//       {/* Navigation dots */}
//       <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
//         {testimonialsData.map((_, index) => (
//           <Box
//             key={index}
//             sx={{
//               width: "12px",
//               height: "12px",
//               borderRadius: "50%",
//               backgroundColor: (index >= currentTestimonial / 3 && index < (currentTestimonial + 3) / 3) ? "#ff4081" : "#ccc",
//               margin: "0 5px",
//               cursor: "pointer",
//               transition: "background-color 0.3s",
//             }}
//             onClick={() => setCurrentTestimonial(index * 1)} 
//           />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default TestimonialPage;
