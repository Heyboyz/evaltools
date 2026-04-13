/**
 * PDFForge — PDF Template Generator
 * Core application logic
 */

// ===== Template Definitions =====
const THERAPIST_OPTIONS = [
    'Andhika Ramadhani P, A.Md.Kes',
    'Aysa Eka Saputri, S.Tr.Kes',
    'Nur Laila Salsabila, A.Md.Kes',
    'Hafizh Zaki Ramadhan, A.Md.Kes',
    'Yoga Dwi Pamungkas, A.Md.Kes',
    'Shalsabila Is’af Bilqis, S. Tr. Kes.',
    'Hinggil Novalia Naluri Tasari, S.Tr.Kes',
    'Baruna Ahmad Sanjaya, A.Md.Kes'
];

function createEvaluasiSections(typeLabel) {
    const hasProblematika = typeLabel === 'NSMD' || typeLabel === 'Fisioterapi';
    
    const sections = [
        {
            title: 'Informasi Pasien',
            fields: [
                { id: 'nama', label: 'Nama Pasien', type: 'text', placeholder: 'Haidar Ahmad Zafi', required: true },
                { id: 'evaluasiKe', label: 'Evaluasi Ke', type: 'number', placeholder: '1', required: true },
                { id: 'tanggalLahir', label: 'Tanggal Lahir', type: 'date', required: true },
                { id: 'jenisKelamin', label: 'Jenis Kelamin', type: 'text', placeholder: 'Laki-Laki' },
                { id: 'namaOrtu', label: 'Nama Orang Tua', type: 'text', placeholder: 'Muhammad Zulfi' },
                { id: 'noPasien', label: 'No. Pasien', type: 'text', placeholder: '-' },
                { id: 'namaTerapis', label: 'Nama Terapis', type: 'select', options: THERAPIST_OPTIONS },
            ]
        }
    ];

    if (hasProblematika) {
        sections.push({
            title: 'Ringkasan Problematika',
            fields: [
                { id: 'keluhanUtama', label: 'Keluhan Utama', type: 'textarea', placeholder: '...' },
                { id: 'impairment', label: 'Impairment', type: 'textarea', placeholder: '...' },
                { id: 'functionalLimitation', label: 'Functional Limitation', type: 'textarea', placeholder: '...' },
                { id: 'participation', label: 'Participation', type: 'textarea', placeholder: '...' },
            ]
        });
    } else {
        sections.push({
            title: 'Ringkasan Problematika',
            fields: [
                { id: 'ringkasanProblematika', label: 'Ringkasan Problematika', type: 'textarea', placeholder: '...' },
            ]
        });
    }

    sections.push(
        {
            title: 'Tujuan Program',
            fields: [
                { id: 'tujuanProgram', label: 'Tujuan Program ' + typeLabel, type: 'textarea', placeholder: '...' },
            ]
        },
        {
            title: 'Program ' + typeLabel,
            fields: [
                {
                    id: 'programFisio', label: 'Daftar Program', type: 'array',
                    subFields: [
                        { id: 'kegiatan', label: 'Kegiatan / Metode', type: 'textarea', placeholder: '...' }
                    ]
                }
            ]
        },
        {
            title: 'Hasil Evaluasi',
            fields: [
                {
                    id: 'hasilEvaluasi', label: 'Hasil per Aspek', type: 'array',
                    subFields: [
                        { id: 'aspek', label: 'Nama Aspek', type: 'text', placeholder: '...' },
                        { id: 'hasil', label: 'Hasil Penilaian', type: 'textarea', placeholder: '...' }
                    ]
                }
            ]
        },
        {
            title: 'Home Program',
            fields: [
                {
                    id: 'homeProgram', label: 'Instruksi Home Program', type: 'array',
                    subFields: [
                        { id: 'instruksi', label: 'Instruksi', type: 'textarea', placeholder: '...' }
                    ]
                }
            ]
        },
        {
            title: 'Saran & Kesimpulan',
            fields: [
                { id: 'kesimpulan', label: 'Kesimpulan', type: 'textarea', placeholder: '...' },
                { id: 'saran', label: 'Saran', type: 'textarea', placeholder: '...' },
                { id: 'catatan', label: 'Catatan Tambahan', type: 'text', placeholder: '-' },
            ]
        }
    );

    return sections;
}

const TEMPLATES = [
    {
        id: 'evaluasi-nsmd',
        name: 'Evaluasi NSMD',
        description: 'Form evaluasi perkembangan terapi pasien NSMD',
        icon: '🧠',
        color: '#00a7b9',
        typeLabel: 'NSMD',
        sections: createEvaluasiSections('NSMD'),
        render: renderEvaluasi
    },
    {
        id: 'evaluasi-sensori-integrasi',
        name: 'Sensori Integrasi',
        description: 'Form evaluasi perkembangan terapi Sensori Integrasi',
        icon: '🧩',
        color: '#ff7d7d',
        typeLabel: 'Sensori Integrasi',
        sections: createEvaluasiSections('Sensori Integrasi'),
        render: renderEvaluasi
    },
    {
        id: 'evaluasi-fisioterapi',
        name: 'Fisioterapi',
        description: 'Form evaluasi perkembangan Fisioterapi',
        icon: '💪',
        color: '#ff9550',
        typeLabel: 'Fisioterapi',
        sections: createEvaluasiSections('Fisioterapi'),
        render: renderEvaluasi
    },
    {
        id: 'evaluasi-terapi-wicara',
        name: 'Terapi Wicara',
        description: 'Form evaluasi perkembangan Terapi Wicara',
        icon: '🗣️',
        color: '#6366f1',
        typeLabel: 'Terapi Wicara',
        sections: createEvaluasiSections('Terapi Wicara'),
        render: renderEvaluasi
    },
    {
        id: 'evaluasi-terapi-okupasi',
        name: 'Terapi Okupasi',
        description: 'Form evaluasi perkembangan Terapi Okupasi',
        icon: '👐',
        color: '#f43f5e',
        typeLabel: 'Terapi Okupasi',
        sections: createEvaluasiSections('Terapi Okupasi'),
        render: renderEvaluasi
    }
];

// ===== DOM Elements =====
const $ = (sel) => document.querySelector(sel);
const templateGrid = $('#templateGrid');
const formContainer = $('#formContainer');
const emptyState = $('#emptyState');
const panels = $('#panels');
const btnPreview = $('#btnPreview');
const btnDownload = $('#btnDownload');
const currentTemplateName = $('#currentTemplateName');
const currentTemplateDesc = $('#currentTemplateDesc');
const previewIframe = $('#previewIframe');
const previewModal = $('#previewModal');
const modalPreviewIframe = $('#modalPreviewIframe');
const closeModal = $('#closeModal');
const sidebarToggle = $('#sidebarToggle');
const sidebar = $('#sidebar');
const toastContainer = $('#toastContainer');

let activeTemplate = null;
let formData = {};
let previewDebounceTimer = null;

// ===== Initialize App =====
function init() {
    renderTemplateCards();
    setupEventListeners();
}

function renderTemplateCards() {
    templateGrid.innerHTML = TEMPLATES.map(t => `
        <div class="template-card" data-id="${t.id}" id="tpl-${t.id}">
            <div class="template-card-icon" style="background: ${t.color}20; color: ${t.color}">
                ${t.icon}
            </div>
            <div class="template-card-info">
                <div class="template-card-title">${t.name}</div>
                <div class="template-card-desc">${t.description}</div>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Template selection
    templateGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.template-card');
        if (!card) return;
        selectTemplate(card.dataset.id);
    });

    // Preview button (mobile)
    btnPreview.addEventListener('click', () => {
        if (!activeTemplate) return;
        updatePreview();
        previewModal.classList.add('active');
    });

    // Download button
    btnDownload.addEventListener('click', downloadPDF);

    // Close modal
    closeModal.addEventListener('click', () => previewModal.classList.remove('active'));
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) previewModal.classList.remove('active');
    });

    // Sidebar toggle
    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling up to document
        sidebar.classList.toggle('open');
    });

    // Close sidebar on clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
}

// ===== Template Selection =====
function selectTemplate(id) {
    const template = TEMPLATES.find(t => t.id === id);
    if (!template) return;

    activeTemplate = template;
    formData = {};

    // Update template cards
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
    document.querySelector(`#tpl-${id}`).classList.add('active');

    // Update header
    currentTemplateName.textContent = template.name;
    currentTemplateDesc.textContent = template.description;

    // Enable buttons
    btnPreview.disabled = false;
    btnDownload.disabled = false;

    // Show form, hide empty state
    emptyState.style.display = 'none';
    panels.style.display = 'flex';

    // Build form
    buildForm(template);

    // Initialize array fields with one empty item
    template.sections.forEach(section => {
        section.fields.forEach(field => {
            if (field.type === 'array') {
                formData[field.id] = [{}];
            }
        });
    });

    // Close sidebar on mobile
    if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
    }

    // Trigger initial preview
    schedulePreviewUpdate();
}

// ===== Form Builder =====
function buildForm(template) {
    formContainer.innerHTML = '';

    template.sections.forEach((section, sIdx) => {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'form-section';
        sectionEl.innerHTML = `<div class="form-section-title">${section.title}</div>`;

        section.fields.forEach(field => {
            if (field.type === 'array') {
                sectionEl.appendChild(buildArrayField(field));
            } else {
                sectionEl.appendChild(buildField(field));
            }
        });

        formContainer.appendChild(sectionEl);
    });
}

function buildField(field, prefix = '') {
    const group = document.createElement('div');
    group.className = 'form-group';

    const fieldId = prefix ? `${prefix}_${field.id}` : field.id;

    let input;
    if (field.type === 'textarea') {
        input = `<textarea class="form-control" id="f_${fieldId}" 
            placeholder="${field.placeholder || ''}" 
            rows="3" data-field="${fieldId}"></textarea>`;
    } else if (field.type === 'select') {
        const optionsHtml = (field.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('');
        input = `<select class="form-control" id="f_${fieldId}" data-field="${fieldId}">
            <option value="" disabled selected>-- Pilih ${field.label} --</option>
            ${optionsHtml}
        </select>`;
    } else if (field.type === 'date') {
        input = `<input type="date" class="form-control" id="f_${fieldId}" 
            data-field="${fieldId}">`;
    } else {
        const inputType = field.type === 'number' ? 'number' : 'text';
        const extraProps = field.type === 'number' ? 'min="1"' : '';
        input = `<input type="${inputType}" ${extraProps} class="form-control" id="f_${fieldId}" 
            placeholder="${field.placeholder || ''}" 
            data-field="${fieldId}">`;
    }

    group.innerHTML = `
        <label for="f_${fieldId}">${field.label}${field.required ? ' <span class="required">*</span>' : ''}</label>
        ${input}
    `;

    // Listen for input changes
    const inputEl = group.querySelector('.form-control');
    inputEl.addEventListener('input', () => {
        formData[fieldId] = inputEl.value;
        schedulePreviewUpdate();
    });

    return group;
}

function buildArrayField(field) {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-group';
    wrapper.innerHTML = `<label>${field.label}</label>`;

    const arrayContainer = document.createElement('div');
    arrayContainer.className = 'array-field';
    arrayContainer.id = `array_${field.id}`;

    // Initialize with one item
    if (!formData[field.id]) formData[field.id] = [{}];

    const renderItems = () => {
        arrayContainer.innerHTML = '';
        formData[field.id].forEach((itemData, idx) => {
            const item = document.createElement('div');
            item.className = 'array-item';
            item.innerHTML = `
                <div class="array-item-header">
                    <span class="array-item-number">#${idx + 1}</span>
                    ${formData[field.id].length > 1 ? `<button class="btn-remove-item" data-idx="${idx}" aria-label="Hapus item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>` : ''}
                </div>
            `;

            field.subFields.forEach(sf => {
                const subFieldId = `${field.id}_${idx}_${sf.id}`;
                const fg = document.createElement('div');
                fg.className = 'form-group';

                let inputHtml;
                if (sf.type === 'textarea') {
                    inputHtml = `<textarea class="form-control" placeholder="${sf.placeholder || ''}" rows="2" data-array="${field.id}" data-idx="${idx}" data-subfield="${sf.id}">${itemData[sf.id] || ''}</textarea>`;
                } else {
                    inputHtml = `<input type="text" class="form-control" placeholder="${sf.placeholder || ''}" value="${itemData[sf.id] || ''}" data-array="${field.id}" data-idx="${idx}" data-subfield="${sf.id}">`;
                }

                fg.innerHTML = `<label>${sf.label}</label>${inputHtml}`;

                const inputEl = fg.querySelector('.form-control');
                inputEl.addEventListener('input', () => {
                    formData[field.id][idx][sf.id] = inputEl.value;
                    schedulePreviewUpdate();
                });

                item.appendChild(fg);
            });

            // Remove button handler
            const removeBtns = item.querySelectorAll('.btn-remove-item');
            removeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    formData[field.id].splice(parseInt(btn.dataset.idx), 1);
                    renderItems();
                    schedulePreviewUpdate();
                });
            });

            arrayContainer.appendChild(item);
        });

        // Add button
        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add-item';
        addBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Tambah Item`;
        addBtn.addEventListener('click', () => {
            formData[field.id].push({});
            renderItems();
        });
        arrayContainer.appendChild(addBtn);
    };

    renderItems();
    wrapper.appendChild(arrayContainer);
    return wrapper;
}

// ===== Preview =====
function schedulePreviewUpdate() {
    clearTimeout(previewDebounceTimer);
    previewDebounceTimer = setTimeout(() => updatePreview(), 1500);
}

function updatePreview() {
    if (!activeTemplate) return;

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'mm', format: 'a4' });

        activeTemplate.render(doc, formData);

        const pdfDataUri = doc.output('datauristring');
        previewIframe.src = pdfDataUri;
        modalPreviewIframe.src = pdfDataUri;
    } catch (err) {
        console.error('Preview error:', err);
    }
}

// ===== Download PDF =====
function downloadPDF() {
    if (!activeTemplate) return;

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'mm', format: 'a4' });

        activeTemplate.render(doc, formData);

        const typeName = (activeTemplate.typeLabel || '').toUpperCase();
        const evalKe = formData.evaluasiKe || '1';
        const childName = formData.nama || 'TanpaNama';
        const filename = `EVAL ${typeName}${evalKe}_${childName}.pdf`;

        doc.save(filename);

        showToast('PDF berhasil didownload!', 'success');
    } catch (err) {
        console.error('Download error:', err);
        showToast('Gagal membuat PDF. Periksa kembali data Anda.', 'error');
    }
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : '✗'}</span>
        <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Helper Functions for PDF Rendering =====
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const d = new Date(dateStr);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function calculateAgeAndFormatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const day = d.getDate().toString().padStart(2, '0');
    const formattedDate = `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
    
    const today = new Date();
    let years = today.getFullYear() - d.getFullYear();
    let m = today.getMonth() - d.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
        years--;
        m += 12;
    }
    if (today.getDate() < d.getDate()) m--;
    if (m < 0) m += 12;

    let ageStr = '';
    if (years > 0) {
        ageStr = `${years} Thn`;
        if (m > 0) ageStr += ` ${m} Bln`;
    } else {
        ageStr = `${m} Bln`;
    }

    return `${ageStr} / ${formattedDate}`;
}

function formatCurrency(num) {
    const n = parseFloat(num) || 0;
    return 'Rp ' + n.toLocaleString('id-ID');
}

function drawLine(doc, y, x1 = 15, x2 = 195) {
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(x1, y, x2, y);
}

function wrapText(doc, text, x, y, maxWidth, lineHeight) {
    if (!text) return y;
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach(line => {
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
        doc.text(line, x, y);
        y += lineHeight;
    });
    return y;
}

// ===== PDF Render: Evaluasi =====
function renderEvaluasi(doc, data) {
    const pw = 210;
    const margin = 20;
    const contentW = pw - margin * 2;
    let y = 20;

    const checkPageBreak = (neededHeight) => {
        if (y + neededHeight > 280) {
            doc.addPage();
            y = 20;
            return true;
        }
        return false;
    };

    // Real Image Logo
    try { doc.addImage(ASSETS.logo, 'JPEG', margin, y - 6, 40, 22.5); } catch(e) { console.error('Logo add error', e); }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(50, 50, 50);
    doc.text('Pusat Terapi dan Tumbuh Kembang', margin + 40, y);
    doc.text('Jl. Cipinang Jaya Raya No. 14C, Cipinang Muara, Kecamatan Jatinegara,', margin + 40, y + 4);
    doc.text('Jakarta Timur, 13420.', margin + 40, y + 8);
    doc.text('Telp. +62859-4296-9747. Email: terapeutik.services@gmail.com', margin + 40, y + 12);

    doc.setDrawColor(220, 38, 38);
    doc.setTextColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.rect(pw - margin - 25, y, 25, 10);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('DOKUMEN', pw - margin - 12.5, y + 4, { align: 'center' });
    doc.text('RAHASIA', pw - margin - 12.5, y + 8, { align: 'center' });

    y += 25;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('FORM EVALUASI PERKEMBANGAN TERAPI', pw / 2, y, { align: 'center' });
    y += 5;
    doc.text(activeTemplate.typeLabel.toUpperCase(), pw / 2, y, { align: 'center' });

    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    const drawFieldInfo = (label, val, xOffset, startY, maxWidth) => {
        // Remove trailing colons and extra spaces used previously for "alignment"
        const cleanLabel = label.replace(/\s*:+\s*$/, '').replace(/\s+/g, ' ');
        doc.text(cleanLabel, xOffset, startY);
        
        // Explicitly format the table so colons are precisely aligned
        doc.text(':', xOffset + 28, startY);
        
        const labelW = 32;
        const lines = doc.splitTextToSize(String(val), maxWidth - labelW);
        doc.text(lines, xOffset + labelW, startY);
        return startY + (lines.length * 5);
    };

    let leftY = y;
    leftY = drawFieldInfo('Nama             :', data.nama || '-', margin, leftY, 75);
    leftY = drawFieldInfo('Jenis Kelamin :', data.jenisKelamin || '-', margin, leftY, 75);
    leftY = drawFieldInfo('No. Pasien     :', data.noPasien || '-', margin, leftY, 75);

    let rightY = y;
    rightY = drawFieldInfo('Umur / Tgl. Lahir:', calculateAgeAndFormatDate(data.tanggalLahir), margin + 80, rightY, 90);
    rightY = drawFieldInfo('Nama Orang tua:', data.namaOrtu || '-', margin + 80, rightY, 90);
    rightY = drawFieldInfo('Nama Terapis    :', data.namaTerapis || '-', margin + 80, rightY, 90);

    y = Math.max(leftY, rightY) + 6;
    doc.setDrawColor(50, 50, 50);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pw - margin, y);
    
    y += 8;

    const wrapLinesToBox = (text, maxWidth, options = {}) => {
        if (!text) return [];
        doc.setFont('helvetica', options.bold ? 'bold' : 'normal');
        doc.setFontSize(9);
        const lines = doc.splitTextToSize(text, maxWidth);
        return lines.map((line, idx) => ({
            text: line,
            bold: options.bold || false,
            justify: options.justify || false,
            indent: options.indent || 0,
            isLastLine: idx === lines.length - 1
        }));
    };

    const drawSectionBox = (title, contentLines) => {
        if (!contentLines || contentLines.length === 0) return;
        checkPageBreak(15);
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(title, margin, y);
        y += 3;

        let boxStartY = y;
        let currentY = boxStartY + 5;
        doc.setTextColor(50, 50, 50);

        contentLines.forEach((lineItem) => {
            let text = typeof lineItem === 'string' ? lineItem : lineItem.text;
            let isBold = typeof lineItem === 'object' && lineItem.bold;
            let isJustify = typeof lineItem === 'object' && lineItem.justify;
            let isLastLine = typeof lineItem === 'object' && lineItem.isLastLine;
            let indent = typeof lineItem === 'object' ? (lineItem.indent || 0) : 0;

            if (currentY > 280) {
                doc.setDrawColor(150, 150, 150);
                doc.setLineWidth(0.3);
                doc.rect(margin, boxStartY, contentW, currentY - boxStartY + 2);
                
                doc.addPage();
                y = 20;
                boxStartY = y;
                currentY = boxStartY + 5;
            }

            doc.setFont('helvetica', isBold ? 'bold' : 'normal');
            doc.setFontSize(9);

            let baseCurX = margin + 5 + indent;
            let availableW = contentW - 10 - indent;

            if (isJustify && !isLastLine && text.trim().indexOf(' ') !== -1) {
                const words = text.trim().split(' ');
                const totalWordsWidth = words.reduce((w, word) => w + doc.getTextWidth(word), 0);
                const spaceToFill = availableW - totalWordsWidth;
                const spaceWidth = spaceToFill / (words.length - 1);
                
                let curX = baseCurX;
                words.forEach((word) => {
                    doc.text(word, curX, currentY);
                    curX += doc.getTextWidth(word) + spaceWidth;
                });
            } else {
                doc.text(text, baseCurX, currentY);
            }
            currentY += 5;
        });

        doc.setDrawColor(150, 150, 150);
        doc.setLineWidth(0.3);
        const boxH = currentY - boxStartY + 2;
        doc.rect(margin, boxStartY, contentW, boxH);
        
        y = currentY + 8;
    };

    const hasProblematika = activeTemplate.typeLabel === 'NSMD' || activeTemplate.typeLabel === 'Fisioterapi';
    
    if (hasProblematika) {
        let probLines = [];
        if(data.keluhanUtama) probLines.push(...wrapLinesToBox(`1. Keluhan Utama: ${data.keluhanUtama}`, contentW - 10));
        if(data.impairment) probLines.push(...wrapLinesToBox(`2. Impairment: ${data.impairment}`, contentW - 10));
        if(data.functionalLimitation) probLines.push(...wrapLinesToBox(`3. Functional Limitation: ${data.functionalLimitation}`, contentW - 10));
        if(data.participation) probLines.push(...wrapLinesToBox(`4. Participation: ${data.participation}`, contentW - 10));
        if (probLines.length === 0) {
            probLines = [
                '1. Keluhan Utama: ', '',
                '2. Impairment: ', '',
                '3. Functional Limitation: ', '',
                '4. Participation: ', ''
            ];
        }
        drawSectionBox('Ringkasan Problematika ' + activeTemplate.typeLabel, probLines);
    } else {
        let probLines = [];
        if(data.ringkasanProblematika) probLines.push(...wrapLinesToBox(data.ringkasanProblematika, contentW - 10));
        if (probLines.length === 0) {
            probLines = [' ', ' ', ' ', ' '];
        }
        drawSectionBox('Ringkasan Problematika ' + activeTemplate.typeLabel, probLines);
    }

    let tujuanLines = wrapLinesToBox(data.tujuanProgram || '', contentW - 10);
    if(tujuanLines.length === 0) tujuanLines = [' ', ' ', ' '];
    drawSectionBox('Tujuan Program ' + activeTemplate.typeLabel, tujuanLines);

    let programLines = [];
    (data.programFisio || []).forEach((p, i) => {
        if (p.kegiatan) programLines.push(...wrapLinesToBox(`${i+1}. ${p.kegiatan}`, contentW - 10));
    });
    if(programLines.length === 0) programLines = ['1. ', '2. ', '3. ', '4. ', '5. '];
    drawSectionBox('Program ' + activeTemplate.typeLabel, programLines);

    let hasilLines = [];
    (data.hasilEvaluasi || []).forEach((h, i) => {
        if (h.aspek) hasilLines.push(...wrapLinesToBox(`${i+1}. ${h.aspek}`, contentW - 10, { bold: true }));
        if (h.hasil) hasilLines.push(...wrapLinesToBox(`${h.hasil}`, contentW - 15, { justify: true, indent: 5 }));
    });
    if(hasilLines.length === 0) hasilLines = ['1. ', ' ', '2. ', ' ', '3. ', ' '];
    drawSectionBox('Hasil Evaluasi ' + activeTemplate.typeLabel, hasilLines);

    let homeLines = [];
    (data.homeProgram || []).forEach((h, i) => {
        if (h.instruksi) homeLines.push(...wrapLinesToBox(`${i+1}. ${h.instruksi}`, contentW - 10));
    });
    if(homeLines.length === 0) homeLines = ['1. ', '2. ', '3. ', '4. '];
    drawSectionBox('Home Program ' + activeTemplate.typeLabel, homeLines);

    let saranLines = [];
    if(data.kesimpulan) {
        saranLines.push(...wrapLinesToBox(`• Kesimpulan:`, contentW - 10));
        saranLines.push(...wrapLinesToBox(data.kesimpulan, contentW - 10));
    }
    if(data.saran) {
        saranLines.push(...wrapLinesToBox(`• Saran:`, contentW - 10));
        saranLines.push(...wrapLinesToBox(data.saran, contentW - 10));
    }
    if(data.catatan) {
        saranLines.push(...wrapLinesToBox(`Catatan : ${data.catatan}`, contentW - 10));
    }
    if(saranLines.length === 0) {
        saranLines = [
            '• Kesimpulan:', ' ', ' ',
            '• Saran:', ' ', ' ',
            'Catatan : '
        ];
    }
    drawSectionBox('Saran dan Kesimpulan Untuk Keluarga', saranLines);

    // Tanda Tangan Khusus Terapis
    const isAndhika = data.namaTerapis && data.namaTerapis.includes('Andhika');
    const isAysa = data.namaTerapis && data.namaTerapis.includes('Aysa');
    const isYoga = data.namaTerapis && data.namaTerapis.includes('Yoga');
    const isHafizh = data.namaTerapis && data.namaTerapis.includes('Hafizh');
    const isNur = data.namaTerapis && data.namaTerapis.includes('Nur');
    const isBaruna = data.namaTerapis && data.namaTerapis.includes('Baruna');
    const isShalsabila = data.namaTerapis && data.namaTerapis.includes('Shalsabila');

    if (isAndhika || isAysa || isYoga || isHafizh || isNur || isBaruna || isShalsabila) {
        checkPageBreak(45); // Space for signature block

        let sigY = y + 15;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        // Date 
        const d = new Date();
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const dateStr = `Jakarta, ${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
        
        const sigCenterX = pw - margin - 35; // Center of the signature box from the right

        doc.text(dateStr, sigCenterX, sigY, { align: 'center' });

        if (isAndhika) {
            try { doc.addImage(ASSETS.ttdAndhika, 'JPEG', sigCenterX - 20, sigY + 2, 40, 40); } catch(e) { console.error('Image add error', e); }
            sigY += 45;

            doc.setFont('helvetica', 'normal');
            const nameStr = 'Andhika Ramadhani Priyanto A.Md.Kes.';
            doc.text(nameStr, sigCenterX, sigY, { align: 'center' });
            
            const nameWidth = doc.getTextWidth(nameStr);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.3);
            doc.line(sigCenterX - (nameWidth/2), sigY + 1, sigCenterX + (nameWidth/2), sigY + 1);

            sigY += 5;
            doc.text('STR : WR00002002252290', sigCenterX, sigY, { align: 'center' });
            
        } else if (isAysa) {
            try { doc.addImage(ASSETS.ttdAysa, 'JPEG', sigCenterX - 20, sigY + 2, 40, 18.4); } catch(e) { console.error('Image add error', e); }
            sigY += 25;

            doc.setFont('helvetica', 'normal');
            const nameStr = 'Aysa Eka Saputri, S.Tr.Kes';
            doc.text(nameStr, sigCenterX, sigY, { align: 'center' });
            
            const nameWidth = doc.getTextWidth(nameStr);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.3);
            doc.line(sigCenterX - (nameWidth/2), sigY + 1, sigCenterX + (nameWidth/2), sigY + 1);

            sigY += 5;
            doc.text('STR : XL00001637741958', sigCenterX, sigY, { align: 'center' });
        } else if (isYoga) {
            try { doc.addImage(ASSETS.ttdYoga, 'JPEG', sigCenterX - 20, sigY + 2, 40, 16.2); } catch(e) { console.error('Image add error', e); }
            sigY += 25;

            doc.setFont('helvetica', 'normal');
            const nameStr = 'Yoga Dwi Pamungkas, A.Md.Kes.';
            doc.text(nameStr, sigCenterX, sigY, { align: 'center' });
            
            const nameWidth = doc.getTextWidth(nameStr);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.3);
            doc.line(sigCenterX - (nameWidth/2), sigY + 1, sigCenterX + (nameWidth/2), sigY + 1);

            sigY += 5;
            doc.text('STR : JI00002004639349', sigCenterX, sigY, { align: 'center' });
        } else if (isHafizh) {
            try { doc.addImage(ASSETS.ttdHafizh, 'JPEG', sigCenterX - 20, sigY + 2, 40, 20.7); } catch(e) { console.error('Image add error', e); }
            sigY += 28;

            doc.setFont('helvetica', 'normal');
            const nameStr = 'Hafizh Zaki Ramadhan, A.Md.Kes.';
            doc.text(nameStr, sigCenterX, sigY, { align: 'center' });
            
            const nameWidth = doc.getTextWidth(nameStr);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.3);
            doc.line(sigCenterX - (nameWidth/2), sigY + 1, sigCenterX + (nameWidth/2), sigY + 1);

            sigY += 5;
            doc.text('STR : FT00002012737163', sigCenterX, sigY, { align: 'center' });
        } else if (isNur) {
            try { doc.addImage(ASSETS.ttdNur, 'JPEG', sigCenterX - 20, sigY + 2, 40, 29.0); } catch(e) { console.error('Image add error', e); }
            sigY += 35;

            doc.setFont('helvetica', 'normal');
            const nameStr = 'Nur Laila Salsabila, A.Md.Kes.';
            doc.text(nameStr, sigCenterX, sigY, { align: 'center' });
            
            const nameWidth = doc.getTextWidth(nameStr);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.3);
            doc.line(sigCenterX - (nameWidth/2), sigY + 1, sigCenterX + (nameWidth/2), sigY + 1);

            sigY += 5;
            doc.text('STR : FL00001712070848', sigCenterX, sigY, { align: 'center' });
        } else if (isBaruna) {
            try { doc.addImage(ASSETS.ttdBaruna, 'JPEG', sigCenterX - 20, sigY + 2, 40, 15.8); } catch(e) { console.error('Image add error', e); }
            sigY += 24;

            doc.setFont('helvetica', 'normal');
            const nameStr = 'Baruna Ahmad Sanjaya, A.Md.Kes.';
            doc.text(nameStr, sigCenterX, sigY, { align: 'center' });
            
            const nameWidth = doc.getTextWidth(nameStr);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.3);
            doc.line(sigCenterX - (nameWidth/2), sigY + 1, sigCenterX + (nameWidth/2), sigY + 1);

            sigY += 5;
            doc.text('STR : RB00000264731328', sigCenterX, sigY, { align: 'center' });
        } else if (isShalsabila) {
            try { doc.addImage(ASSETS.ttdShalsabila, 'JPEG', sigCenterX - 20, sigY + 2, 40, 20); } catch(e) { console.error('Image add error', e); }
            sigY += 25;

            doc.setFont('helvetica', 'normal');
            const nameStr = "Shalsabila Is'af Bilqis, S. Tr. Kes.";
            doc.text(nameStr, sigCenterX, sigY, { align: 'center' });
            
            const nameWidth = doc.getTextWidth(nameStr);
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.3);
            doc.line(sigCenterX - (nameWidth/2), sigY + 1, sigCenterX + (nameWidth/2), sigY + 1);

            sigY += 5;
            doc.text('STR : CM00001665304568', sigCenterX, sigY, { align: 'center' });
        }
    }

    const totalPages = typeof doc.getNumberOfPages === 'function' ? doc.getNumberOfPages() : doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Instagram : terapeutik.id', pw - margin, 290, { align: 'right' });
    }
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
