import PyPDF2

pdf_file = open('a1.pdf')
read_pdf = PyPDF2.PdfFileReader(pdf_file)

print(read_pdf)