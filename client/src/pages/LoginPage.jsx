import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../components/ButtonLoader';
import { useAuth } from '../context/AuthContext';
import { useAppToast } from '../hooks/useAppToast';
import { getErrorMessage } from '../utils/helpers';

/* ── inline SVG illustration (4 people, flat vector style) ── */
const TeamIllustration = () => (
  <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
    {/* Shadow ellipses on floor */}
    <ellipse cx="100" cy="318" rx="44" ry="10" fill="#b2d8d8" opacity="0.4"/>
    <ellipse cx="190" cy="318" rx="38" ry="10" fill="#b2d8d8" opacity="0.4"/>
    <ellipse cx="272" cy="318" rx="40" ry="10" fill="#b2d8d8" opacity="0.4"/>
    <ellipse cx="358" cy="318" rx="42" ry="10" fill="#b2d8d8" opacity="0.4"/>

    {/* ── Person 1 – yellow top, teal pants ── */}
    {/* pants */}
    <rect x="72" y="220" width="20" height="90" rx="8" fill="#0d9488"/>
    <rect x="96" y="220" width="20" height="90" rx="8" fill="#0d9488"/>
    {/* shoes */}
    <rect x="68" y="302" width="26" height="12" rx="5" fill="#1e293b"/>
    <rect x="92" y="302" width="26" height="12" rx="5" fill="#1e293b"/>
    {/* body */}
    <rect x="68" y="155" width="56" height="70" rx="14" fill="#fbbf24"/>
    {/* head */}
    <circle cx="96" cy="135" r="26" fill="#f5c5a3"/>
    {/* hair */}
    <path d="M70 130 Q96 100 122 130" fill="#1e293b"/>
    {/* arm left */}
    <rect x="50" y="160" width="18" height="50" rx="9" fill="#fbbf24"/>
    {/* arm right */}
    <rect x="118" y="160" width="18" height="50" rx="9" fill="#fbbf24"/>

    {/* ── Person 2 – floral top, black pants ── */}
    {/* pants */}
    <rect x="158" y="218" width="20" height="92" rx="8" fill="#1e293b"/>
    <rect x="182" y="218" width="20" height="92" rx="8" fill="#1e293b"/>
    {/* shoes */}
    <rect x="154" y="302" width="26" height="12" rx="5" fill="#0f172a"/>
    <rect x="178" y="302" width="26" height="12" rx="5" fill="#0f172a"/>
    {/* body – floral */}
    <rect x="154" y="148" width="56" height="75" rx="14" fill="#6366f1"/>
    <circle cx="165" cy="162" r="4" fill="#a5f3fc" opacity="0.7"/>
    <circle cx="178" cy="175" r="3" fill="#fde68a" opacity="0.7"/>
    <circle cx="190" cy="160" r="4" fill="#f9a8d4" opacity="0.7"/>
    <circle cx="172" cy="188" r="3" fill="#a5f3fc" opacity="0.7"/>
    <circle cx="196" cy="182" r="4" fill="#fde68a" opacity="0.7"/>
    {/* head */}
    <circle cx="182" cy="126" r="26" fill="#f5c5a3"/>
    {/* hair */}
    <path d="M156 118 Q182 88 208 118 Q208 95 182 90 Q156 95 156 118Z" fill="#7c3aed"/>
    {/* arm left */}
    <rect x="136" y="155" width="18" height="50" rx="9" fill="#6366f1"/>
    {/* arm right */}
    <rect x="204" y="155" width="18" height="50" rx="9" fill="#6366f1"/>

    {/* ── Person 3 – teal outfit ── */}
    {/* pants */}
    <rect x="243" y="215" width="21" height="95" rx="8" fill="#0d9488"/>
    <rect x="268" y="215" width="21" height="95" rx="8" fill="#0d9488"/>
    {/* shoes */}
    <rect x="239" y="302" width="27" height="12" rx="5" fill="#1e293b"/>
    <rect x="264" y="302" width="27" height="12" rx="5" fill="#1e293b"/>
    {/* body */}
    <rect x="239" y="143" width="58" height="76" rx="14" fill="#14b8a6"/>
    {/* head */}
    <circle cx="268" cy="122" r="27" fill="#fde9d0"/>
    {/* hair */}
    <path d="M241 117 Q268 87 295 117" fill="#92400e"/>
    {/* arm left */}
    <rect x="220" y="150" width="19" height="52" rx="9" fill="#14b8a6"/>
    {/* arm right */}
    <rect x="297" y="150" width="19" height="52" rx="9" fill="#14b8a6"/>

    {/* ── Person 4 – navy / dark blue ── */}
    {/* pants */}
    <rect x="330" y="213" width="22" height="97" rx="8" fill="#1e40af"/>
    <rect x="356" y="213" width="22" height="97" rx="8" fill="#1e40af"/>
    {/* shoes */}
    <rect x="326" y="302" width="28" height="12" rx="5" fill="#0f172a"/>
    <rect x="352" y="302" width="28" height="12" rx="5" fill="#0f172a"/>
    {/* body */}
    <rect x="326" y="140" width="60" height="78" rx="14" fill="#1e3a8a"/>
    {/* head */}
    <circle cx="356" cy="118" r="28" fill="#f5c5a3"/>
    {/* hair */}
    <path d="M328 112 Q356 80 384 112 Q384 86 356 80 Q328 86 328 112Z" fill="#1e293b"/>
    {/* arm left */}
    <rect x="306" y="148" width="20" height="54" rx="9" fill="#1e3a8a"/>
    {/* arm right */}
    <rect x="386" y="148" width="20" height="54" rx="9" fill="#1e3a8a"/>

    {/* subtle background circle decoration */}
    <circle cx="50" cy="80" r="35" fill="#ccfbf1" opacity="0.5"/>
    <circle cx="390" cy="60" r="25" fill="#ddd6fe" opacity="0.4"/>
    <circle cx="20" cy="260" r="18" fill="#fef9c3" opacity="0.5"/>
  </svg>
);

/* ── tiny briefcase icon for logo ── */
const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12.01"/>
  </svg>
);

function LoginPage() {
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const toast = useAppToast();

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await login(values.email, values.password);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      const message = getErrorMessage(err);
      setServerError(message);
      toast.error(message);
    }
  };

  const handleGuestLogin = async () => {
    setServerError('');
    setIsGuestLoading(true);
    try {
      await guestLogin();
      toast.success('Logged in as Interviewer Demo');
      navigate('/dashboard');
    } catch (err) {
      const message = getErrorMessage(err);
      setServerError(message);
      toast.error(message);
    } finally {
      setIsGuestLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#dff0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ── Outer card ── */}
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
        display: 'flex',
        width: '100%',
        maxWidth: '860px',
        minHeight: '520px',
        overflow: 'hidden',
      }}>

        {/* ══ LEFT PANEL ══ */}
        <div style={{
          flex: '1 1 55%',
          background: 'linear-gradient(145deg, #e6f7f7 0%, #d0f0f0 100%)',
          padding: '40px 36px 24px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0d9488', fontWeight: '700', fontSize: '17px' }}>
            <BriefcaseIcon />
            <span>JobTracker.</span>
          </div>

          {/* Headline */}
          <div style={{ marginTop: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', margin: 0 }}>
              Track Your
            </h1>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0d9488', lineHeight: '1.2', margin: 0 }}>
              Dream Career.
            </h1>
            <p style={{ marginTop: '10px', color: '#475569', fontSize: '13.5px', lineHeight: '1.6' }}>
              Manage every application,<br/>interview and offer in one place.
            </p>
          </div>

          {/* Illustration */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', marginTop: '16px' }}>
            <TeamIllustration />
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div style={{
          flex: '1 1 45%',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            Welcome to JobTracker
          </h2>
          <p style={{ marginTop: '6px', fontSize: '13px', color: '#94a3b8' }}>
            Track your job applications with ease
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Email */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                style={{
                  marginTop: '6px',
                  width: '100%',
                  border: errors.email ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '11px 14px',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  background: '#f8fafc',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = '#0d9488'}
                onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : '#e2e8f0'}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
                })}
              />
              {errors.email && <p style={{ marginTop: '4px', fontSize: '12px', color: '#ef4444' }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative', marginTop: '6px' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    border: errors.password ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '11px 42px 11px 14px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    background: '#f8fafc',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = '#0d9488'}
                  onBlur={e => e.target.style.borderColor = errors.password ? '#ef4444' : '#e2e8f0'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Minimum 6 characters' }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px', lineHeight: 1 }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {errors.password && <p style={{ marginTop: '4px', fontSize: '12px', color: '#ef4444' }}>{errors.password.message}</p>}
            </div>

            {/* Forgot password */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-8px' }}>
              <span style={{ fontSize: '12.5px', color: '#0d9488', cursor: 'pointer', fontWeight: '500' }}>Forgot password?</span>
            </div>

            {/* Server error */}
            {serverError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#ef4444' }}>
                {serverError}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: isSubmitting ? '#5eead4' : '#0d9488',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '13px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background 0.2s, transform 0.1s',
                boxShadow: '0 4px 14px rgba(13,148,136,0.35)',
              }}
              onMouseEnter={e => { if (!isSubmitting) e.target.style.background = '#0f766e'; }}
              onMouseLeave={e => { if (!isSubmitting) e.target.style.background = '#0d9488'; }}
            >
              {isSubmitting ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                  </svg>
                  Logging in...
                </>
              ) : 'Login'}
            </button>
          </form>

          {/* ══ DEMO ACCOUNT / INTERVIEWER ACCESS SECTION ══ */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #e2e8f0' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#166534', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                  💼 Interviewer Access
                </span>
                <span style={{ fontSize: '10.5px', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>
                  1-Click Demo
                </span>
              </div>

              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={isGuestLoading || isSubmitting}
                style={{
                  width: '100%',
                  background: (isGuestLoading || isSubmitting) ? '#86efac' : '#16a34a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '11px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: (isGuestLoading || isSubmitting) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 3px 10px rgba(22,163,74,0.25)',
                  transition: 'background 0.2s, transform 0.1s',
                }}
                onMouseEnter={e => { if (!isGuestLoading && !isSubmitting) e.target.style.background = '#15803d'; }}
                onMouseLeave={e => { if (!isGuestLoading && !isSubmitting) e.target.style.background = '#16a34a'; }}
              >
                {isGuestLoading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                    </svg>
                    Logging in as Guest...
                  </>
                ) : (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Continue as Guest
                  </>
                )}
              </button>
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#15803d', textAlign: 'center', lineHeight: '1.4' }}>
                Email: <strong>interviewer@demo.com</strong> &nbsp;•&nbsp; Pass: <strong>InterviewerDemo2026!</strong>
              </div>
            </div>
          </div>

          {/* Register link */}
          <p style={{ marginTop: '18px', fontSize: '13px', color: '#94a3b8', textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#0d9488', fontWeight: '600', textDecoration: 'none' }}>
              Register
            </Link>
          </p>

          {/* Footer */}
          <p style={{ marginTop: 'auto', paddingTop: '32px', fontSize: '11px', color: '#cbd5e1', textAlign: 'center' }}>
            © {new Date().getFullYear()} JobTracker. All rights reserved.
          </p>
        </div>
      </div>

      {/* Spin animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoginPage;
