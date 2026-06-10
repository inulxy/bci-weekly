"use client";

export default function Footer() {
  return (
    <footer
      id="about"
      className="mt-16"
      style={{ borderTop: "1px solid rgba(29, 48, 80, 0.6)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="font-mono text-base font-semibold"
                style={{ color: "#00D4FF" }}
              >
                ψ
              </span>
              <span
                className="font-display font-semibold text-sm"
                style={{ color: "#E2EAF4" }}
              >
                NeuralPulse Weekly
              </span>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "#3D566E" }}
            >
              脑机接口领域每周重要进展追踪。覆盖学术论文、公司动态、临床进展、政策法规四大维度。
            </p>
          </div>

          {/* Data sources */}
          <div>
            <h4
              className="font-mono text-xs font-semibold mb-3 uppercase tracking-widest"
              style={{ color: "#3D566E" }}
            >
              数据来源
            </h4>
            <ul className="flex flex-col gap-1.5">
              {[
                "PubMed / arXiv",
                "Nature / Science / NEJM",
                "FDA / EMA 官方公告",
                "Crunchbase / 企业公告",
                "SfN / NeurIPS 等会议",
              ].map((src) => (
                <li
                  key={src}
                  className="font-mono text-xs"
                  style={{ color: "#3D566E" }}
                >
                  · {src}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-mono text-xs font-semibold mb-3 uppercase tracking-widest"
              style={{ color: "#3D566E" }}
            >
              链接
            </h4>
            <ul className="flex flex-col gap-1.5">
              {[
                { label: "RSS 订阅", href: "#" },
                { label: "邮件周报", href: "#subscribe" },
                { label: "投稿线索", href: "#" },
                { label: "关于我们", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-xs transition-colors duration-150"
                    style={{ color: "#3D566E", textDecoration: "none" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "#7A95B0")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "#3D566E")
                    }
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(29, 48, 80, 0.4)" }}
        >
          <span className="font-mono text-xs" style={{ color: "#3D566E" }}>
            © 2026 NeuralPulse · 内容仅供参考，不构成医疗建议
          </span>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs" style={{ color: "#3D566E" }}>
              每周一更新
            </span>
            <div className="flex items-center gap-1.5">
              <span className="pulse-dot" style={{ background: "#1EE8A0" }} />
              <span className="font-mono text-xs" style={{ color: "#1EE8A0" }}>
                W23 · 在线
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
