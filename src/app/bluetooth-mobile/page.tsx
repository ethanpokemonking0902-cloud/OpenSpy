'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bluetooth, BluetoothSearching, ArrowLeft, Smartphone
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   MOBILE BLUETOOTH CONNECTOR
   Simple connection page for phone Bluetooth
   ═══════════════════════════════════════════════════════════════ */

export default function BluetoothMobilePage() {
  const [connecting, setConnecting] = useState(false);
  const [btOk, setBtOk] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const mtd = useRef(true);
  const errT = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize
  useEffect(() => {
    if (typeof navigator !== 'undefined' && !navigator.bluetooth) {
      setBtOk(false);
      setError('Web Bluetooth not available on this device');
    }
    mtd.current = true;

    return () => {
      mtd.current = false;
      if (errT.current) clearTimeout(errT.current);
    };
  }, []);

  // Error handler
  const setErr = useCallback((m: string | null) => {
    if (!mtd.current) return;
    setError(m);
    if (errT.current) clearTimeout(errT.current);
    if (m) errT.current = setTimeout(() => {
      if (mtd.current) setError(null);
    }, 5000);
  }, []);

  // Enable phone Bluetooth
  const enableBluetooth = useCallback(async () => {
    if (!navigator.bluetooth || connecting) return;
    setConnecting(true);
    setError(null);

    try {
      const d = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
      if (!d) {
        setConnecting(false);
        return;
      }

      // Try to connect to the device
      try {
        const gatt = await d.gatt?.connect();
        if (gatt) {
          setConnected(true);
          setErr('Phone Bluetooth connected successfully');
        }
      } catch (e: any) {
        setErr('Could not establish connection: ' + e.message);
      }

      setConnecting(false);
    } catch (e: any) {
      if (e.name !== 'NotFoundError') {
        setErr(e.message);
      }
      setConnecting(false);
    }
  }, [connecting, setErr]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, var(--bg-void) 0%, var(--bg-primary) 50%, var(--bg-void) 100%)',
      fontFamily: 'var(--font-hud)',
    }}>
      <div className="w-full max-w-sm px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <button
            onClick={() => window.history.back()}
            className="absolute top-4 left-4 p-2 rounded-lg hover:bg-[var(--hover-accent)] transition-colors"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
          </button>

          <div className="flex items-center justify-center gap-3 mb-3">
            <Smartphone className="w-6 h-6" style={{ color: '#FFB800' }} />
            <h1 className="text-[18px] font-bold tracking-[0.08em]" style={{ color: 'var(--text-primary)' }}>
              PHONE BLUETOOTH
            </h1>
          </div>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            MOBILE SCANNING MODE
          </p>
        </div>

        {/* Status */}
        <div className="mb-8 p-4 rounded-xl border" style={{
          background: connected ? 'rgba(224, 224, 224, 0.04)' : 'rgba(255, 255, 255, 0.02)',
          borderColor: connected ? 'rgba(224, 224, 224, 0.12)' : 'rgba(255, 255, 255, 0.08)',
        }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
              background: connected ? 'rgba(224, 224, 224, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: `2px solid ${connected ? '#E0E0E0' : 'var(--text-muted)'}`,
            }}>
              <Bluetooth className="w-5 h-5" style={{ color: connected ? '#E0E0E0' : 'var(--text-muted)' }} />
            </div>
            <div>
              <p className="text-[11px] font-bold" style={{ color: 'var(--text-primary)' }}>
                Status
              </p>
              <p className="text-[10px]" style={{ color: connected ? '#E0E0E0' : 'var(--text-muted)' }}>
                {connected ? 'CONNECTED' : 'NOT CONNECTED'}
              </p>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 rounded-xl border flex items-start gap-2"
            style={{
              background: 'rgba(255, 61, 61, 0.04)',
              borderColor: 'rgba(255, 61, 61, 0.1)',
            }}
          >
            <p className="text-[10px]" style={{ color: connected ? '#E0E0E0' : '#FF3D3D' }}>
              {error}
            </p>
          </motion.div>
        )}

        {/* Connect Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={enableBluetooth}
          disabled={connecting || !btOk || connected}
          className="w-full py-4 rounded-xl font-bold text-[12px] tracking-[0.1em] flex items-center justify-center gap-2.5 mb-6 disabled:opacity-40 transition-all border"
          style={{
            background: connecting ? 'rgba(0, 230, 255, 0.06)' : connected ? 'rgba(224, 224, 224, 0.08)' : 'rgba(0, 230, 255, 0.12)',
            color: connected ? '#E0E0E0' : 'var(--cyan-primary)',
            borderColor: 'rgba(0, 230, 255, 0.2)',
          }}
        >
          {connecting ? (
            <>
              <BluetoothSearching className="w-4 h-4 animate-pulse" />
              <span>CONNECTING...</span>
            </>
          ) : connected ? (
            <>
              <Bluetooth className="w-4 h-4" />
              <span>CONNECTED</span>
            </>
          ) : (
            <>
              <Bluetooth className="w-4 h-4" />
              <span>ENABLE BLUETOOTH</span>
            </>
          )}
        </motion.button>

        {/* Info Box */}
        <div className="p-4 rounded-xl border" style={{
          background: 'rgba(255, 255, 255, 0.02)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
        }}>
          <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Tap <span className="font-bold" style={{ color: 'var(--text-primary)' }}>ENABLE BLUETOOTH</span> to connect your phone's Bluetooth. Your phone will scan for nearby Bluetooth devices using its native Bluetooth capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}
