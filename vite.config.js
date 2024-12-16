import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://122.186.126.218:8040',  // Replace with your backend API URL
  //       changeOrigin: true,  // Needed for virtual hosted sites
  //       secure: false,       // If your API uses https, set this to true
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
