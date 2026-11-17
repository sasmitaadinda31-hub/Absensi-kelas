const KEY='hadirin_attendance_v1';
const $=id=>document.getElementById(id);
const today=()=>new Date().toLocaleDateString('en-CA');
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return []}};
const save=data=>localStorage.setItem(KEY,JSON.stringify(data));
const dateLabel=new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
if($('todayDate')) $('todayDate').textContent=dateLabel;
const menu=$('menuBtn'); if(menu) menu.addEventListener('click',()=>$('nav').classList.toggle('open'));
const theme=$('themeToggle'); if(theme){if(localStorage.getItem('hadirin_theme')==='dark')document.body.classList.add('dark');theme.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('hadirin_theme',document.body.classList.contains('dark')?'dark':'light')})}
function badge(status){return `<span class="status status-${status}">${status}</span>`}
function renderHome(){
 if(!$('attendanceList'))return;
 const all=read(), rows=all.filter(x=>x.date===today()), query=($('searchInput').value||'').toLowerCase();
 const filtered=rows.filter(x=>x.name.toLowerCase().includes(query));
 $('attendanceList').innerHTML=filtered.length?filtered.map((x,i)=>`<tr><td>${i+1}</td><td>${escapeHtml(x.name)}</td><td>${x.time}</td><td>${badge(x.status)}</td><td><button class="delete-btn" data-delete="${x.id}">Hapus</button></td></tr>`).join(''):`<tr><td colspan="5" class="empty">Belum ada data yang cocok.</td></tr>`;
 $('totalStudents').textContent=rows.length;$('presentCount').textContent=rows.filter(x=>x.status==='Hadir').length;$('missingCount').textContent=rows.filter(x=>x.status==='Alpa').length;$('heroCount').textContent=rows.length+' siswa';$('tableCount').textContent=`Menampilkan ${filtered.length} dari ${rows.length} data`;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const form=$('attendanceForm');if(form){form.addEventListener('submit',e=>{e.preventDefault();const name=$('studentName').value.trim();if(name.length<2){$('formMessage').textContent='Nama harus diisi minimal 2 karakter.';$('formMessage').style.color='#d45b69';$('studentName').focus();return}const data=read();data.push({id:Date.now().toString(),name,date:today(),time:new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}),status:$('status').value});save(data);form.reset();$('formMessage').textContent='Absensi berhasil disimpan!';$('formMessage').style.color='#159b70';renderHome()})}
if($('searchInput'))$('searchInput').addEventListener('input',renderHome);
if($('attendanceList')){$('attendanceList').addEventListener('click',e=>{const id=e.target.dataset.delete;if(id){save(read().filter(x=>x.id!==id));renderHome()}})}
if($('clearToday'))$('clearToday').addEventListener('click',()=>{if(confirm('Hapus semua absensi hari ini?')){save(read().filter(x=>x.date!==today()));renderHome()}});
function renderHistory(){if(!$('historyList'))return;const data=read().slice().reverse();$('historyList').innerHTML=data.length?data.map((x,i)=>`<tr><td>${i+1}</td><td>${x.date}</td><td>${escapeHtml(x.name)}</td><td>${x.time}</td><td>${badge(x.status)}</td></tr>`).join(''):`<tr><td colspan="5" class="empty">Belum ada riwayat absensi.</td></tr>`;$('historyCount').textContent=data.length+' catatan'}
if($('clearAll'))$('clearAll').addEventListener('click',()=>{if(confirm('Yakin ingin menghapus seluruh riwayat?')){save([]);renderHistory()}});
if($('exportCsv'))$('exportCsv').addEventListener('click',()=>{const data=read();if(!data.length){alert('Belum ada data untuk diunduh.');return}const csv=[['Tanggal','Nama','Waktu','Status'],...data.map(x=>[x.date,x.name,x.time,x.status])].map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='riwayat-absensi.csv';a.click();URL.revokeObjectURL(url)});
renderHome();renderHistory();
