const questions = [
  {
    q: "Você recebe um e-mail de \"suporte@nubank-seguro.com\" avisando um problema na sua conta. O que torna esse endereço suspeito?",
    options: [
      "Ele usa a palavra \"seguro\", o que é raro em e-mails de banco",
      "\"nubank-seguro.com\" não é o domínio oficial do Nubank, mesmo citando o nome do banco",
      "E-mails de suporte nunca devem ter a palavra \"suporte\" no início"
    ],
    correct: 1,
    explain: "O nome do banco aparecendo no endereço não garante nada — o que importa é o domínio depois do @, e \"nubank-seguro.com\" não pertence à empresa real."
  },
  {
    q: "Um site pede seu login e mostra o símbolo de cadeado (conexão segura/HTTPS) na barra de endereço. Isso significa que o site é confiável?",
    options: [
      "Sim, o cadeado garante que o site é legítimo e pode ser usado sem receio",
      "Não necessariamente — o cadeado só indica que a conexão é criptografada, mesmo sites falsos podem ter esse símbolo",
      "Só é confiável se o cadeado for verde, não cinza"
    ],
    correct: 1,
    explain: "O cadeado mostra apenas que os dados trafegam de forma criptografada entre você e o site — não que o site seja verdadeiro. Golpistas também conseguem esse selo em páginas clonadas."
  },
  {
    q: "Duas mensagens chegam no mesmo dia: uma diz \"sua fatura vence hoje, pague agora\" e outra diz \"detectamos login incomum, clique para revisar em até 30 minutos\". O que as duas têm em comum como estratégia de golpe?",
    options: [
      "Ambas oferecem tempo suficiente para você pensar com calma",
      "Ambas usam prazo curto para impedir que você pare e analise antes de agir",
      "Ambas pedem apenas seu nome completo, nada além disso"
    ],
    correct: 1,
    explain: "Prazos curtos e sensação de urgência são a ferramenta mais comum do phishing: quanto menos tempo você sente que tem, menos você para para verificar se é golpe."
  },
  {
    q: "Você ativou a verificação em duas etapas. Um golpista descobre sua senha através de um site falso. Isso significa que ele já consegue entrar na sua conta?",
    options: [
      "Sim, a senha sozinha já é suficiente para qualquer conta",
      "Não necessariamente — ele ainda precisaria do segundo código, que normalmente só você recebe",
      "Só consegue entrar se souber também sua data de nascimento"
    ],
    correct: 1,
    explain: "A verificação em duas etapas foi criada exatamente para isso: mesmo com a senha vazada, falta o segundo fator (código, aplicativo ou token) que o golpista não tem acesso."
  },
  {
    q: "Uma mensagem de \"RH da empresa\" pede que você clique em um link para \"atualizar seus dados no sistema de folha de pagamento\" ainda hoje. Qual detalhe pesa mais para decidir se é golpe?",
    options: [
      "Se o e-mail foi escrito em português correto, sem erros de gramática",
      "Se o link leva realmente ao domínio interno da empresa, e não a um endereço externo parecido",
      "Se a mensagem tem a logomarca oficial da empresa no topo"
    ],
    correct: 1,
    explain: "Gramática correta e logomarca são fáceis de copiar. O que realmente importa é para onde o link leva de verdade — o endereço final do site."
  },
  {
    q: "Por que o phishing em massa continua compensando para o criminoso, mesmo quando quase todo mundo identifica o golpe e ignora a mensagem?",
    options: [
      "Porque o golpista foca em enganar sempre a mesma pessoa várias vezes",
      "Porque o volume de mensagens é tão grande que até uma fração mínima de vítimas já gera lucro",
      "Porque provedores de e-mail nunca bloqueiam esse tipo de mensagem"
    ],
    correct: 1,
    explain: "A lógica é de escala: disparando para milhões de endereços, mesmo uma taxa de sucesso de menos de 1% já significa centenas ou milhares de vítimas."
  },
  {
    q: "Você recebe dois e-mails de cobrança parecidos. Um vem de \"cobranca@correios.com.br\" e outro de \"cobranca@correios-brasil.net\". Qual costuma ser o sinal mais confiável de que um deles é falso?",
    options: [
      "O tom mais formal do texto",
      "O domínio depois do @ — \"correios.com.br\" é o oficial, um domínio parecido mas diferente é sinal de alerta",
      "A hora em que a mensagem foi enviada"
    ],
    correct: 1,
    explain: "Domínios parecidos com o real, mas com pequenas variações (hífen, extensão diferente, palavra extra), são uma das táticas mais usadas para simular confiança."
  },
  {
    q: "Um colega de trabalho, aparentemente, te envia uma mensagem pedindo urgência para você comprar cartões-presente e mandar os códigos por e-mail, dizendo que está \"em reunião e não pode ligar\". O que essa situação tem de mais suspeito?",
    options: [
      "Pedir algo por e-mail em vez de pessoalmente já é sempre golpe",
      "A combinação de urgência, pedido incomum e impossibilidade de confirmar por voz é um padrão clássico de golpe, mesmo vindo de um contato conhecido",
      "Cartões-presente são um método de pagamento inseguro para qualquer compra"
    ],
    correct: 1,
    explain: "Contas de colegas ou chefes também podem ser clonadas ou invadidas. A combinação de urgência + pedido fora do comum + impossibilidade de confirmar é o padrão de alerta, não o canal em si."
  }
];

let current = 0;
let score = 0;
let answered = false;
let shuffledOptions = [];   // array de {text, isCorrect} já embaralhado da pergunta atual

function shuffle(array){
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderProgress(){
  const p = document.getElementById('progress');
  p.innerHTML = '';
  questions.forEach((_, i) => {
    const s = document.createElement('span');
    if (i < current) s.className = 'done';
    else if (i === current) s.className = 'current';
    p.appendChild(s);
  });
}

function renderQuestion(){
  answered = false;
  const item = questions[current];
  document.getElementById('qtext').textContent = (current+1) + '. ' + item.q;

  // monta a lista {text, isCorrect} e embaralha a posição das alternativas
  const raw = item.options.map((text, i) => ({ text, isCorrect: i === item.correct }));
  shuffledOptions = shuffle(raw);

  const opts = document.getElementById('options');
  opts.innerHTML = '';
  shuffledOptions.forEach((opt, i) => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.textContent = opt.text;
    b.onclick = () => selectAnswer(i);
    opts.appendChild(b);
  });
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('feedback').textContent = '';
  document.getElementById('nextBtn').className = 'btn';
  renderProgress();
}

function selectAnswer(i){
  if (answered) return;
  answered = true;
  const item = questions[current];
  const buttons = document.querySelectorAll('.opt');
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if (shuffledOptions[idx].isCorrect) b.classList.add('correct');
    else if (idx === i) b.classList.add('wrong');
  });
  if (shuffledOptions[i].isCorrect) score++;
  const fb = document.getElementById('feedback');
  fb.innerHTML = (shuffledOptions[i].isCorrect ? '<b>Certo. </b>' : '<b>Quase. </b>') + item.explain;
  fb.className = 'feedback show';
  document.getElementById('nextBtn').className = 'btn show';
  document.getElementById('nextBtn').textContent = current === questions.length - 1 ? 'Ver resultado' : 'Próxima pergunta';
}

function nextQuestion(){
  current++;
  if (current >= questions.length){
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult(){
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

function restartQuiz(){
  current = 0;
  score = 0;
  document.getElementById('quiz-live').style.display = 'block';
  document.getElementById('nextBtn').style.display = 'inline-block';
  document.getElementById('result').className = 'result';
  renderQuestion();
}

renderQuestion();
