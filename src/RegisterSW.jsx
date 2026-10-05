// src/RegisterSW.jsx
import { useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

export default function RegisterSW() {
  useEffect(() => {
    registerSW({ immediate: true });
  }, []);
  return null;
}