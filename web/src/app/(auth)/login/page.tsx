import LoginForm from "./components/login-form";

function LoginPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center p-10" style={{
        boxShadow: "rgba(0, 0, 0, 0.08) 0px 12px 24px",
        borderRadius: "10px",
      }}>
        <div className="logo mb-10">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="10" fill="#E31C79" />
            <path d="M30 20H60V50H45V35.5H30V20Z" fill="white" />
            <path
              d="M21.5 28L30 20V35H15L21.5 28Z"
              fill="white"
              fillOpacity="0.4"
            />
            <path d="M30 35H45V50H30V35Z" fill="white" fillOpacity="0.4" />
            <path
              d="M45 50H60L52.5 57.5L45 65V50Z"
              fill="white"
              fillOpacity="0.4"
            />
          </svg>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
