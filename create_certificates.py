from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageTemplate, Frame
from reportlab.lib import colors
from datetime import datetime
import os

certificates = [
    {
        'filename': 'certificates/Infosys_Python_Part1.pdf',
        'title': 'Programming Fundamentals using Python – Part 1',
        'issuer': 'Infosys Springboard',
        'description': 'Certificate of Completion for mastering Python programming fundamentals'
    },
    {
        'filename': 'certificates/GeeksforGeeks_Python_Course.pdf',
        'title': 'Free Python Course with Certificate',
        'issuer': 'GeeksforGeeks',
        'description': '3-week Python course covering basic concepts, syntax, and logic building'
    },
    {
        'filename': 'certificates/Accenture_AI_Course.pdf',
        'title': 'Artificial Intelligence Course',
        'issuer': 'Accenture',
        'description': 'Understanding AI fundamentals, industry applications, and key trends'
    },
    {
        'filename': 'certificates/MongoDB_Developer_Associate.pdf',
        'title': 'MongoDB Developer Associate',
        'issuer': 'MongoDB',
        'description': 'Associate level certification for database design and integration'
    }
]

for cert in certificates:
    doc = SimpleDocTemplate(cert['filename'], pagesize=letter, topMargin=1*inch, bottomMargin=1*inch)
    styles = getSampleStyleSheet()
    story = []
    
    # Title
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=colors.HexColor('#3b82f6'),
        spaceAfter=20,
        alignment=1
    )
    story.append(Paragraph('Certificate of Completion', title_style))
    story.append(Spacer(1, 0.3*inch))
    
    # Issuer
    issuer_style = ParagraphStyle(
        'Issuer',
        parent=styles['Normal'],
        fontSize=14,
        textColor=colors.HexColor('#06b6d4'),
        spaceAfter=30,
        alignment=1
    )
    story.append(Paragraph(f'Issued by {cert["issuer"]}', issuer_style))
    
    # Content
    content_style = ParagraphStyle(
        'Content',
        parent=styles['Normal'],
        fontSize=12,
        spaceAfter=20,
        alignment=1
    )
    story.append(Paragraph(f'<b>{cert["title"]}</b>', content_style))
    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph(cert['description'], content_style))
    story.append(Spacer(1, 0.5*inch))
    
    # Footer
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.grey,
        alignment=1
    )
    story.append(Paragraph(f'Issued on: {datetime.now().strftime("%B %d, %Y")}', footer_style))
    
    doc.build(story)
    print(f'✓ Created {cert["title"]}')

print('\nAll certificates created successfully!')
