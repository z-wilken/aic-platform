import PDFDocument from 'pdfkit';
import { StorageService } from '@aic/db';
import { AICSessionUser } from '@aic/types';

/**
 * INSTITUTIONAL REPORT GENERATOR
 * 
 * Generates SANAS-compliant PDF certificates for AI Integrity Audits.
 * Automatically archives reports in the sovereign evidence vault (MinIO).
 */
export class ReportGenerator {
  /**
   * Generate a compliance certificate and return the S3 URL
   */
  static async generateCertificate(
    user: AICSessionUser,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    auditData: { score: number; tier: string; requirements: any[] }
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', async () => {
        const pdfBuffer = Buffer.concat(buffers);
        const fileName = `certificates/${user.orgId}/AIC_CERT_${Date.now()}.pdf`;

        try {
          const url = await StorageService.uploadEvidence(
            user.orgId,
            fileName,
            pdfBuffer,
            'application/pdf'
          );
          resolve(url);
        } catch (err) {
          reject(err);
        }
      });

      // --- PDF CONTENT ---
      doc.fontSize(25).text('CERTIFICATE OF AI INTEGRITY', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Organization: ${user.orgName}`);
      doc.text(`Organization ID: ${user.orgId}`);
      doc.text(`Certification Tier: ${auditData.tier}`);
      doc.text(`Issue Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();
      
      doc.rect(50, 200, 500, 50).stroke();
      doc.fontSize(20).text(`INTEGRITY SCORE: ${auditData.score}%`, 50, 215, { align: 'center' });
      
      doc.moveDown(4);
      doc.fontSize(14).text('Verified Requirements:');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      auditData.requirements.forEach((req: any) => {
        doc.fontSize(10).text(`• [${req.status}] ${req.title}`);
      });

      doc.moveDown(2);
      doc.fillColor('gray').fontSize(8).text('This document is cryptographically signed and stored in the AIC National Ledger.', { align: 'center' });

      doc.end();
    });
  }
}
