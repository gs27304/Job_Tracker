import { Link } from 'react-router-dom';

/* ── inline SVG illustration (4 people, flat vector style) ── */
const TeamIllustration = () => (
  <svg
    viewBox="0 0 420 340"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: '100%',
      maxWidth: '340px',
      margin: '0 auto',
    }}
  >
    {/* Floor shadows */}
    <ellipse cx="100" cy="318" rx="44" ry="10" fill="#b2d8d8" opacity="0.4" />
    <ellipse cx="190" cy="318" rx="38" ry="10" fill="#b2d8d8" opacity="0.4" />
    <ellipse cx="272" cy="318" rx="40" ry="10" fill="#b2d8d8" opacity="0.4" />
    <ellipse cx="358" cy="318" rx="42" ry="10" fill="#b2d8d8" opacity="0.4" />

    {/* Person 1 */}
    <rect x="72" y="220" width="20" height="90" rx="8" fill="#0d9488" />
    <rect x="96" y="220" width="20" height="90" rx="8" fill="#0d9488" />

    <rect x="68" y="302" width="26" height="12" rx="5" fill="#1e293b" />
    <rect x="92" y="302" width="26" height="12" rx="5" fill="#1e293b" />

    <rect x="68" y="155" width="56" height="70" rx="14" fill="#fbbf24" />

    <circle cx="96" cy="135" r="26" fill="#f5c5a3" />

    <path d="M70 130 Q96 100 122 130" fill="#1e293b" />

    <rect x="50" y="160" width="18" height="50" rx="9" fill="#fbbf24" />
    <rect x="118" y="160" width="18" height="50" rx="9" fill="#fbbf24" />

    {/* Person 2 */}
    <rect x="158" y="218" width="20" height="92" rx="8" fill="#1e293b" />
    <rect x="182" y="218" width="20" height="92" rx="8" fill="#1e293b" />

    <rect x="154" y="302" width="26" height="12" rx="5" fill="#0f172a" />
    <rect x="178" y="302" width="26" height="12" rx="5" fill="#0f172a" />

    <rect x="154" y="148" width="56" height="75" rx="14" fill="#6366f1" />

    <circle cx="165" cy="162" r="4" fill="#a5f3fc" opacity="0.7" />
    <circle cx="178" cy="175" r="3" fill="#fde68a" opacity="0.7" />
    <circle cx="190" cy="160" r="4" fill="#f9a8d4" opacity="0.7" />
    <circle cx="172" cy="188" r="3" fill="#a5f3fc" opacity="0.7" />
    <circle cx="196" cy="182" r="4" fill="#fde68a" opacity="0.7" />

    <circle cx="182" cy="126" r="26" fill="#f5c5a3" />

    <path
      d="M156 118 Q182 88 208 118 Q208 95 182 90 Q156 95 156 118Z"
      fill="#7c3aed"
    />

    <rect x="136" y="155" width="18" height="50" rx="9" fill="#6366f1" />
    <rect x="204" y="155" width="18" height="50" rx="9" fill="#6366f1" />

    {/* Person 3 */}
    <rect x="243" y="215" width="21" height="95" rx="8" fill="#0d9488" />
    <rect x="268" y="215" width="21" height="95" rx="8" fill="#0d9488" />

    <rect x="239" y="302" width="27" height="12" rx="5" fill="#1e293b" />
    <rect x="264" y="302" width="27" height="12" rx="5" fill="#1e293b" />

    <rect x="239" y="143" width="58" height="76" rx="14" fill="#14b8a6" />

    <circle cx="268" cy="122" r="27" fill="#fde9d0" />

    <path d="M241 117 Q268 87 295 117" fill="#92400e" />

    <rect x="220" y="150" width="19" height="52" rx="9" fill="#14b8a6" />
    <rect x="297" y="150" width="19" height="52" rx="9" fill="#14b8a6" />

    {/* Person 4 */}
    <rect x="330" y="213" width="22" height="97" rx="8" fill="#1e40af" />
    <rect x="356" y="213" width="22" height="97" rx="8" fill="#1e40af" />

    <rect x="326" y="302" width="28" height="12" rx="5" fill="#0f172a" />
    <rect x="352" y="302" width="28" height="12" rx="5" fill="#0f172a" />

    <rect x="326" y="140" width="60" height="78" rx="14" fill="#1e3a8a" />

    <circle cx="356" cy="118" r="28" fill="#f5c5a3" />

    <path
      d="M328 112 Q356 80 384 112 Q384 86 356 80 Q328 86 328 112Z"
      fill="#1e293b"
    />

    <rect x="306" y="148" width="20" height="54" rx="9" fill="#1e3a8a" />
    <rect x="386" y="148" width="20" height="54" rx="9" fill="#1e3a8a" />

    {/* Background decorations */}
    <circle cx="50" cy="80" r="35" fill="#ccfbf1" opacity="0.5" />
    <circle cx="390" cy="60" r="25" fill="#ddd6fe" opacity="0.4" />
    <circle cx="20" cy="260" r="18" fill="#fef9c3" opacity="0.5" />
  </svg>
);

/* ── Briefcase icon ── */
const BriefcaseIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="12.01" />
  </svg>
);

function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#dff0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* Outer Card */}
      <div
        style={{
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
          display: 'flex',
          width: '100%',
          maxWidth: '860px',
          minHeight: '520px',
          overflow: 'hidden',
        }}
      >
        {/* ═════════ LEFT PANEL ═════════ */}
        <div
          style={{
            flex: '1 1 55%',
            background:
              'linear-gradient(145deg, #e6f7f7 0%, #d0f0f0 100%)',
            padding: '40px 36px 24px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#0d9488',
              fontWeight: '700',
              fontSize: '17px',
            }}
          >
            <BriefcaseIcon />
            <span>JobTracker.</span>
          </div>

          {/* Heading */}
          <div style={{ marginTop: '32px' }}>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#0f172a',
                lineHeight: '1.2',
                margin: 0,
              }}
            >
              Track Your
            </h1>

            <h1
              style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#0d9488',
                lineHeight: '1.2',
                margin: 0,
              }}
            >
              Dream Career.
            </h1>

            <p
              style={{
                marginTop: '10px',
                color: '#475569',
                fontSize: '13.5px',
                lineHeight: '1.6',
              }}
            >
              Manage every application,
              <br />
              interview and offer in one place.
            </p>
          </div>

          {/* Illustration */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'flex-end',
              marginTop: '16px',
            }}
          >
            <TeamIllustration />
          </div>
        </div>

        {/* ═════════ RIGHT PANEL ═════════ */}
        <div
          style={{
            flex: '1 1 45%',
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#0f172a',
                margin: 0,
              }}
            >
              Welcome to JobTracker
            </h2>

            <p
              style={{
                marginTop: '8px',
                fontSize: '13px',
                color: '#94a3b8',
                lineHeight: '1.6',
              }}
            >
              Keep track of your job applications,
              interviews and offers all in one place.
            </p>

            {/* Feature points */}
            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '9px',
                    background: '#ccfbf1',
                    color: '#0d9488',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                  }}
                >
                  ✓
                </div>

                <span
                  style={{
                    fontSize: '13px',
                    color: '#475569',
                  }}
                >
                  Organize all your applications
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '9px',
                    background: '#ccfbf1',
                    color: '#0d9488',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                  }}
                >
                  ✓
                </div>

                <span
                  style={{
                    fontSize: '13px',
                    color: '#475569',
                  }}
                >
                  Track interview progress
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '9px',
                    background: '#ccfbf1',
                    color: '#0d9488',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                  }}
                >
                  ✓
                </div>

                <span
                  style={{
                    fontSize: '13px',
                    color: '#475569',
                  }}
                >
                  Stay organized throughout your search
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div
              style={{
                marginTop: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <Link
                to="/login"
                style={{
                  width: '100%',
                  background: '#0d9488',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '13px',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  display: 'block',
                  boxShadow:
                    '0 4px 14px rgba(13,148,136,0.35)',
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={{
                  width: '100%',
                  background: '#fff',
                  color: '#0d9488',
                  border: '1.5px solid #0d9488',
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  display: 'block',
                }}
              >
                Create an Account
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p
            style={{
              marginTop: 'auto',
              paddingTop: '32px',
              fontSize: '11px',
              color: '#cbd5e1',
              textAlign: 'center',
            }}
          >
            © {new Date().getFullYear()} JobTracker. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;