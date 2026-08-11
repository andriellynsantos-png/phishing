const questions = [
  {
    q: "Você recebe um e-mail do \"seu banco\" avisando que sua conta será bloqueada em 2 horas. O que fazer primeiro?",
    options: [
      "Clicar no link do e-mail rapidamente antes que expire",
      "Abrir o app oficial do banco ou digitar o site de cor para checar",
      "Responder o e-mail pedindo mais detalhes"
    ],
    correct: 1,
    explain: "A urgência é a principal arma do golpista. O caminho seguro é sempre ir direto ao app ou site oficial, nunca pelo link recebido."
  },
  {
    q: "Qual desses é o maior sinal de alerta em um e-mail?",
    options: [
      "O logotipo da empresa está bonito e colorido",
      "O endereço do remetente não bate com o domínio oficial da empresa",
      "O e-mail chegou de manhã"
    ],
    correct: 1,
    explain: "Um logotipo bonito é fácil de copiar. O endereço real do remetente é muito mais difícil de falsificar de forma perfeita."
  },
  {
    q: "Por que o phishing em massa funciona mesmo enganando pouquíssimas pessoas?",
    options: [
      "Porque o golpista manda para poucas pessoas escolhidas a dedo",
      "Porque basta uma fração mínima clicar, entre milhões de mensagens, para dar lucro",
      "Porque todo mundo sempre cai no golpe"
    ],
    correct: 1,
    explain: "É a lógica da rede no oceano: 0,1% de milhões de mensagens ainda é um número enorme de vítimas."
  },
  {
    q: "Qual prática realmente reduz o risco mesmo se sua senha vazar?",
    options: [
      "Usar a mesma senha em todos os sites para não esquecer",
      "Ativar a verificação em duas etapas",
      "Guardar a senha anotada no post-it do monitor"
    ],
    correct: 1,
    explain: "A verificação em duas etapas exige um segundo código, então mesmo com a senha vazada o golpista não consegue entrar sozinho."
  },
  {
    q: "Uma empresa séria pede sua senha completa por e-mail para \"confirmar sua identidade\". Isso é normal?",
    options: [
      "Sim, é um procedimento comum de segurança",
      "Não, nenhuma empresa séria pede senha por e-mail",
      "Depende de quantas letras a senha tem"
    ],
    correct: 1,
    explain: "Pedir senha por e-mail é, na prática, sempre um sinal de golpe — bancos e serviços sérios não fazem isso."
  },
  {
    q: "Você recebeu um e-mail estranho de \"entrega dos Correios\" com um link. Qual a atitude mais segura?",
    options: [
      "Passar o mouse sobre o link para ver o endereço real antes de clicar",
      "Clicar assim mesmo, já que é rápido conferir",
      "Encaminhar o e-mail para vários amigos para eles verem"
    ],
    correct: 0,
    explain: "Verificar o endereço real do link (sem clicar) já revela boa parte dos golpes, por causa de domínios estranhos ou trocados."
  }
];

let current = 0;
let score = 0;
let answered = false;

function renderProgress() {
  const p = document.getElementById('progress');
  p.innerHTML = '';
  questions.forEach((_, i) => {
    const s = document.createElement('span');
    if (i < current) s.className = 'done';
    else if (i === current) s.className = 'current';
    p.appendChild(s);
  });
}

function renderQuestion() {
  answered = false;
  const item = questions[current];
  document.getElementById('qtext').textContent = (current + 1) + '. ' + item.q;
  const opts = document.getElementById('options');
  opts.innerHTML = '';
  item.options.forEach((opt, i) => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.textContent = opt;
    b.onclick = () => selectAnswer(i);
    opts.appendChild(b);
  });
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('feedback').textContent = '';
  document.getElementById('nextBtn').className = 'btn';
  renderProgress();
}

function selectAnswer(i) {
  if (answered) return;
  answered = true;
  const item = questions[current];
  const buttons = document.querySelectorAll('.opt');
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === item.correct) b.classList.add('correct');
    else if (idx === i) b.classList.add('wrong');
  });
  if (i === item.correct) score++;
  const fb = document.getElementById('feedback');
  fb.innerHTML = (i === item.correct ? '<b>Certo. </b>' : '<b>Quase. </b>') + item.explain;
  fb.className = 'feedback show';
  document.getElementById('nextBtn').className = 'btn show';
  document.getElementById('nextBtn').textContent = current === questions.length - 1 ? 'Ver resultado' : 'Próxima pergunta';
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  document.getElementById('quiz-live').style.display = 'none';
  document.getElementById('nextBtn').className = 'btn';
  document.getElementById('nextBtn').style.display = 'none';
  const result = document.getElementById('result');
  result.className = 'result show';
  document.getElementById('score').textContent = score + ' / ' + questions.length;
  let msg = '';
  if (score === questions.length) msg = 'Rede furada. Você identificou todas as iscas — continue assim ao checar remetentes e links.';
  else if (score >= questions.length - 2) msg = 'Bom olho. Você pegou a maioria das iscas, só fique atento aos detalhes que ainda passaram.';
  else msg = 'Vale reforçar o hábito de checar remetente, link e urgência antes de clicar em qualquer coisa.';
  document.getElementById('resultMsg').textContent = msg;
  renderProgress();
}

function restartQuiz() {
  current = 0;
  score = 0;
  document.getElementById('quiz-live').style.display = 'block';
  document.getElementById('nextBtn').style.display = 'inline-block';
  document.getElementById('result').className = 'result';
  renderQuestion();
}

renderQuestion();