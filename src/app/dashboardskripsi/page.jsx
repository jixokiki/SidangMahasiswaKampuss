// "use client";
// import { useState, useEffect } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebase"; // Assuming you have initialized Firebase
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged } from "firebase/auth"; // Import the method to check auth state

// import styles from "./dashboardskripsi.module.css"; // Import CSS untuk styling
// import Navbar from "../navbar/Navbar";

// export default function DashboardSkripsi() {
//   const [nim, setNim] = useState("");
//   const [sksditempuh, setSksditempuh] = useState("");
//   const [sksberjalan, setSksberjalan] = useState("");
//   const [nama, setNama] = useState("");
//   const [jurusan, setJurusan] = useState("");
//   const [angkatan, setAngkatan] = useState("");
//   const [cabangKampus, setCabangKampus] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state during Firestore checks
//   const [message, setMessage] = useState(null); // For success or error messages
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Fungsi untuk mengambil data berdasarkan NIM dari Firestore
//   const fetchUserDataByNim = async (nim) => {
//     if (nim) {
//       try {
//         const docRef = doc(db, "users", nim);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           setNama(userData.nama || ""); // Isi nama
//           setJurusan(userData.jurusan || ""); // Isi jurusan
//           setAngkatan(userData.angkatan || ""); // Isi angkatan
//           setCabangKampus(userData.cabangKampus || ""); // Isi cabang kampus
//           setRole(userData.role || "");
//         } else {
//           // Reset jika NIM tidak ditemukan
//           setNama("");
//           setJurusan("");
//           setAngkatan("");
//           setCabangKampus("");
//           setRole("");
//         }
//       } catch (error) {
//         console.error("Error fetching NIM data: ", error);
//         setError("Error fetching NIM data");
//       }
//     }
//   };

//   // Panggil fetchUserDataByNim setiap kali nim berubah
//   useEffect(() => {
//     fetchUserDataByNim(nim);
//   }, [nim]);

//   // Function to handle registration
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null); // Reset error sebelum proses
//     try {
//       const email = `${nim}@university.edu`; // Generate email based on NIM (you can customize this)
//       const password = nim; // Use NIM as the password (or any secure password logic you prefer)

//       // Membuat akun pengguna baru di Firebase Authentication
//       await createUserWithEmailAndPassword(auth, email, password);

//       // Menyimpan data tambahan ke Firestore
//       await setDoc(doc(db, "usersSkripsi", nim), {
//         sksditempuh,
//         sksberjalan,
//         nama,
//         jurusan,
//         angkatan,
//         cabangKampus,
//         role,
//       });
//       setMessage({ type: "success", text: "Registration successful!" });
//       router.push("/dashboard"); // Redirect to login page after successful registration
//       alert("form berhasilk dikirim")
//     } catch (error) {
//       console.error("Registrasi gagal: ", error.message);
//       setError("Registrasi gagal: " + error.message);
//     }
//   };

//   // Check authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true); // User is signed in
//       } else {
//         setIsLoggedIn(false); // No user is signed in
//       }
//     });

//     return () => unsubscribe(); // Cleanup subscription on unmount
//   }, []);

//   return (
//     <>
//       <Navbar isLoggedIn={isLoggedIn} />
//       <div className={styles.container}>
//         <h1 className={styles.title}>Pengajuan Skripsi</h1>

//         {/* Form to fetch NIM */}
//         <form onSubmit={(e) => { e.preventDefault(); fetchUserDataByNim(nim); }} className={styles.form}>
//           <input
//             type="text"
//             value={nim}
//             onChange={(e) => setNim(e.target.value)}
//             placeholder="Masukkan NIM"
//             className={styles.inputField}
//           />
//           <button type="submit" className={styles.button}>
//             Cek NIM
//           </button>
//         </form>

//         {/* Display auto-filled data if NIM is found */}
//         {nama && (
//           <form onSubmit={handleRegister} className={styles.formContainer}>
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nim}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nama}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={jurusan}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={angkatan}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={cabangKampus}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={role}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksditempuh}
//               onChange={(e) => setSksditempuh(e.target.value)}
//               placeholder="Masukkan SKS Ditempuh"
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksberjalan}
//               onChange={(e) => setSksberjalan(e.target.value)}
//               placeholder="Masukkan SKS Berjalan"
//             />
//             {error && <p className={styles.error}>{error}</p>}
//             <button type="submit" className={styles.button}>
//               Register
//             </button>
//           </form>
//         )}

//         {/* Display success or error messages */}
//         {message && (
//           <p className={message.type === "success" ? styles.success : styles.error}>
//             {message.text}
//           </p>
//         )}
//       </div>
//     </>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, fetchSignInMethodsForEmail } from "firebase/auth"; // Import the required functions
import { auth, db } from "../../firebase"; // Assuming you have initialized Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import styles from "./dashboardskripsi.module.css"; // Import CSS untuk styling
import Navbar from "../navbar/Navbar";

export default function DashboardSkripsi() {
  const [nim, setNim] = useState("");
  const [sksditempuh, setSksditempuh] = useState("");
  const [sksberjalan, setSksberjalan] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [cabangKampus, setCabangKampus] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state during Firestore checks
  const [message, setMessage] = useState(null); // For success or error messages
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fungsi untuk mengambil data berdasarkan NIM dari Firestore
  const fetchUserDataByNim = async (nim) => {
    if (nim) {
      try {
        const docRef = doc(db, "users", nim);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setNama(userData.nama || ""); // Isi nama
          setJurusan(userData.jurusan || ""); // Isi jurusan
          setAngkatan(userData.angkatan || ""); // Isi angkatan
          setCabangKampus(userData.cabangKampus || ""); // Isi cabang kampus
          setRole(userData.role || "");
        } else {
          // Reset jika NIM tidak ditemukan
          setNama("");
          setJurusan("");
          setAngkatan("");
          setCabangKampus("");
          setRole("");
        }
      } catch (error) {
        console.error("Error fetching NIM data: ", error);
        setError("Error fetching NIM data");
      }
    }
  };

  // Panggil fetchUserDataByNim setiap kali nim berubah
  useEffect(() => {
    fetchUserDataByNim(nim);
  }, [nim]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before the process
    const email = `${nim}@university.edu`; // Generate email based on NIM
    const password = nim; // Use NIM as the password

    try {
        // Check if the email is already in use
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
            setError("Email is already in use. Please use a different email.");
            return;
        }

        // Create a new user in Firebase Authentication
        await createUserWithEmailAndPassword(auth, email, password);

        // Save additional data to Firestore
        await setDoc(doc(db, "usersSkripsi", nim), {
            sksditempuh,
            sksberjalan,
            nama,
            jurusan,
            angkatan,
            cabangKampus,
            role,
        });
        
        setMessage({ type: "success", text: "Registration successful!" });
        router.push("/dashboard"); // Redirect after successful registration
    } catch (error) {
        console.error("Registration failed: ", error.message);
        setError("Registration failed: " + error.message);
    }
};


  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is signed in
      } else {
        setIsLoggedIn(false); // No user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        <h1 className={styles.title}>Pengajuan Skripsi</h1>

        {/* Form to fetch NIM */}
        <form onSubmit={(e) => { e.preventDefault(); fetchUserDataByNim(nim); }} className={styles.form}>
          <input
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="Masukkan NIM"
            className={styles.inputField}
          />
          <button type="submit" className={styles.button}>
            Cek NIM
          </button>
        </form>

        {/* Display auto-filled data if NIM is found */}
        {nama && (
          <form onSubmit={handleRegister} className={styles.formContainer}>
            <input
              type="text"
              className={styles.inputField}
              value={nim}
              readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
            />
            <input
              type="text"
              className={styles.inputField}
              value={nama}
              readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
            />
            <input
              type="text"
              className={styles.inputField}
              value={jurusan}
              readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
            />
            <input
              type="text"
              className={styles.inputField}
              value={angkatan}
              readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
            />
            <input
              type="text"
              className={styles.inputField}
              value={cabangKampus}
              readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
            />
            <input
              type="text"
              className={styles.inputField}
              value={role}
              readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
            />
            <input
              type="text"
              className={styles.inputField}
              value={sksditempuh}
              onChange={(e) => setSksditempuh(e.target.value)}
              placeholder="Masukkan SKS Ditempuh"
            />
            <input
              type="text"
              className={styles.inputField}
              value={sksberjalan}
              onChange={(e) => setSksberjalan(e.target.value)}
              placeholder="Masukkan SKS Berjalan"
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button}>
              Register
            </button>
          </form>
        )}

        {/* Display success or error messages */}
        {message && (
          <p className={message.type === "success" ? styles.success : styles.error}>
            {message.text}
          </p>
        )}
      </div>
    </>
  );
}
