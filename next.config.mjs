import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default function getConfig(env) {
  if (env === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://dxavero:TyIrDmlWtfQaDU0T@cluster0.91wuajd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "Threads",
        NEXTAUTH_SECRET: "oidkjcozeicnjzpeock8795",
        NEXTAUTH_URL: "http://localhost:3000",
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://dxavero:TyIrDmlWtfQaDU0T@cluster0.91wuajd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "Threads",
        NEXTAUTH_SECRET: "oidkjcozeicnjzpeock8795",
        NEXTAUTH_URL: "http://localhost:3000",
      },
    };
  }
}
