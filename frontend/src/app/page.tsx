"use client"

import {  Spin } from 'antd';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLogged = !!localStorage.getItem('token')
      if (isLogged) {
        router.push("/pages/home")
      } else {
        router.push("/pages/login")
      }
    } else {
      router.push("/pages/login")
    }
  }, [router])


  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    </div>
  );
}
