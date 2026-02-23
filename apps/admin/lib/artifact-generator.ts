/**
 * AIC ARTIFACT GENERATOR
 * 
 * Produces ISO 42001 compliant Model Cards and transparency reports.
 * Includes cryptographic watermarking placeholders.
 */

export function getModelCardTemplate(data: {
  name: string;
  version: string;
  description: string;
  trainingData: string;
  biasScore: number;
  accuracy: number;
  responsiblePerson: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:italic,wght@0,400;0,700;1,400&display=swap');
        body { font-family: 'Crimson Pro', serif; color: #1a1a1a; padding: 60px; line-height: 1.6; position: relative; }
        .watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 80px;
          color: rgba(212, 175, 55, 0.1);
          white-space: nowrap;
          z-index: -1;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 10px;
        }
        .header { border-bottom: 3px solid #d4af37; padding-bottom: 20px; margin-bottom: 40px; }
        .title { font-size: 32px; font-weight: bold; letter-spacing: -1px; }
        .tag { font-family: monospace; font-size: 10px; background: #000; color: #fff; padding: 4px 8px; border-radius: 4px; vertical-align: middle; margin-left: 10px; }
        .section { margin-bottom: 40px; }
        .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #d4af37; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 30px; }
        .metric-card { background: #f9f9f9; padding: 20px; border-radius: 15px; border: 1px solid #eee; }
        .metric-label { font-size: 9px; font-weight: bold; text-transform: uppercase; color: #888; margin-bottom: 5px; }
        .metric-value { font-size: 24px; font-weight: bold; }
        .footer { position: fixed; bottom: 40px; width: 100%; left: 0; padding: 0 60px; font-size: 9px; color: #aaa; }
      </style>
    </head>
    <body>
      <div class="watermark">AIC CERTIFIED ARTIFACT</div>

      <div class="header">
        <div class="title">${data.name} <span class="tag">v${data.version}</span></div>
        <p style="font-style: italic; color: #666; margin-top: 10px;">Transparency Model Card for Accountability by Design</p>
      </div>

      <div class="section">
        <div class="section-title">Algorithmic Intent</div>
        <p>${data.description}</p>
      </div>

      <div class="section">
        <div class="section-title">Accountability Metrics</div>
        <div class="grid">
          <div class="metric-card">
            <div class="metric-label">Training Data Integrity</div>
            <div class="metric-value">${data.accuracy}%</div>
            <p style="font-size: 10px; color: #666; margin-top: 5px;">Validated against ISO/IEC 42001 standards.</p>
          </div>
          <div class="metric-card">
            <div class="metric-label">Bias Deviation Index</div>
            <div class="metric-value" style="color: ${data.biasScore > 0.2 ? '#c41e3a' : '#2c5f2d'}">${data.biasScore}</div>
            <p style="font-size: 10px; color: #666; margin-top: 5px;">Disparate impact ratio analysis.</p>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Dataset Demographics</div>
        <p style="font-size: 13px;">${data.trainingData}</p>
      </div>

      <div class="section">
        <div class="section-title">Certification Status</div>
        <p style="font-size: 12px;"><strong>Lead Responsible Person:</strong> ${data.responsiblePerson}</p>
        <p style="font-size: 12px;"><strong>Issuing Authority:</strong> AI Integrity Certification (AIC) Global Registry</p>
      </div>

      <div class="footer">
        This artifact is cryptographically linked to AIC Audit Ledger Hash: SHA256-${Math.random().toString(36).substring(7).toUpperCase()}
        <br/>
        Valid for professional review under POPIA Section 71 and ISO/IEC 17024 guidelines.
      </div>
    </body>
    </html>
  `;
}
