import React from "react";
import { useLocation } from "react-router-dom";
import { serverURL } from "../../../services/serverURL";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

function ProposalSuccess() {
    const location = useLocation()
    const { proposal, decision, signature } = location.state || {}

    const timestamp = signature?.signedAt
        ? new Date(signature.signedAt).toLocaleString()
        : new Date().toLocaleString()

    const generatePDF = async () => {
        const pdfDoc = await PDFDocument.create()
        const page = pdfDoc.addPage([595, 842])
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

        page.drawText('Proposal Signature Certificate', {
            x: 50, y: 780, size: 20, font: boldFont, color: rgb(0, 0, 0)
        })
        page.drawLine({
            start: { x: 50, y: 765 }, end: { x: 545, y: 765 },
            thickness: 1, color: rgb(0.8, 0.8, 0.8)
        })

        const details = [
            { label: 'Proposal', value: proposal?.projectId?.projectName },
            { label: 'Client Name', value: signature?.clientName },
            { label: 'Client Email', value: signature?.clientEmail },
            { label: 'Decision', value: decision },
            { label: 'IP Address', value: signature?.ipAddress },
            { label: 'Timestamp', value: timestamp },
        ]

        let y = 730
        details.forEach(({ label, value }) => {
            page.drawText(`${label}:`, {
                x: 50, y, size: 12, font: boldFont, color: rgb(0.4, 0.4, 0.4)
            })
            page.drawText(value || '-', {
                x: 200, y, size: 12, font, color: rgb(0, 0, 0)
            })
            y -= 30
        })

        if (decision === 'Accepted' && signature?.signatureImageUrl) {
            try {
                const imgUrl = `${serverURL}/${signature.signatureImageUrl}`
                const imgBytes = await fetch(imgUrl).then(r => r.arrayBuffer())
                const img = await pdfDoc.embedPng(imgBytes)
                page.drawText('Signature:', {
                    x: 50, y, size: 12, font: boldFont, color: rgb(0.4, 0.4, 0.4)
                })
                y -= 20
                page.drawImage(img, { x: 50, y: y - 80, width: 200, height: 80 })
            } catch (e) {
                console.log('signature image not loaded', e)
            }
        }

        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `proposal_${signature?.clientName}_${decision}.pdf`
        link.click()
    }

    return (
        <div className="min-h-screen bg-blue-50">
            <div className="bg-black px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-white rounded-md p-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12h6M9 16h6M9 8h3M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                                stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-white font-medium text-sm">ProposalHub</span>
                </div>
                <span className="text-blue-200 text-xs">Secure proposal viewer</span>
            </div>

            <div className="flex items-center justify-center py-16 px-4">
                <div className="bg-white rounded-lg shadow p-8 w-full max-w-md text-center">

                    <div className={`${decision === 'Rejected' ? 'bg-red-100' : 'bg-green-100'} rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4`}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            {decision === 'Rejected' ? (
                                <path d="M6 18L18 6M6 6l12 12" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
                            ) : (
                                <path d="M5 13l4 4L19 7" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </svg>
                    </div>

                    <h2 className="text-xl font-semibold mb-1">Proposal {decision}!</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Your response has been recorded. The sender has been notified.
                    </p>

                    <div className="bg-gray-50 rounded p-4 text-left space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Proposal</span>
                            <span className="font-medium">{proposal?.projectId?.projectName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Client</span>
                            <span className="font-medium">{signature?.clientName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Email</span>
                            <span className="font-medium">{signature?.clientEmail}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Status</span>
                            <span className={`${decision === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} text-xs font-medium px-3 py-1 rounded-full`}>
                                {decision}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Timestamp</span>
                            <span className="font-medium">{timestamp}</span>
                        </div>
                    </div>

                    <p className="text-gray-400 text-xs mt-5">
                        You may close this page. Your response has been recorded.
                    </p>
                    <button
                        onClick={generatePDF}
                        className="mt-5 w-full bg-black text-white py-2 rounded font-medium cursor-pointer text-sm" style={{ background: "linear-gradient(145deg, #111111 0%, #333333 100%)" }} 
                        onMouseEnter={e => e.target.style.background = "linear-gradient(145deg, #333333 0%, #555555 100%)"}
                            onMouseLeave={e => e.target.style.background = "linear-gradient(145deg, #111111 0%, #333333 100%)"}
                        
                    >
                        Download PDF Certificate
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ProposalSuccess;