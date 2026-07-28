import { useState } from 'react'
import { supabase } from './supabaseClient'

const WHATSAPP = '5551997612770'

const Logo = () => (
  <svg className="logo-mark" viewBox="0 0 100 100" fill="none">
    <rect x="30" y="8" width="40" height="76" rx="8" fill="#1F4D40" />
    <rect x="36" y="16" width="28" height="52" rx="2" fill="#E1F5EE" />
    <circle cx="50" cy="76" r="3" fill="#E1F5EE" />
    <circle cx="12" cy="30" r="6" fill="none" stroke="#1F4D40" strokeWidth="3" />
    <circle cx="88" cy="30" r="6" fill="none" stroke="#1F4D40" strokeWidth="3" />
    <path d="M18 30 Q30 12 42 30" fill="none" stroke="#1F4D40" strokeWidth="3" strokeLinecap="round" />
    <path d="M58 30 Q70 12 82 30" fill="none" stroke="#1F4D40" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

function scrollToForm() {
  document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  const [form, setForm] = useState({ nome: '', telefone: '', tipo: 'Conserto', modelo: '', descricao: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nome.trim() || !form.telefone.trim()) {
      setStatus({ type: 'error', msg: 'Preencha nome e WhatsApp para continuar.' })
      return
    }
    setLoading(true)
    setStatus(null)
    const { error } = await supabase.from('contatos').insert([
      {
        nome: form.nome.trim(),
        telefone: form.telefone.trim(),
        tipo: form.tipo,
        modelo: form.modelo.trim(),
        descricao: form.descricao.trim(),
      },
    ])
    setLoading(false)
    if (error) {
      setStatus({ type: 'error', msg: 'Não foi possível enviar agora. Tente novamente em instantes.' })
      return
    }
    setStatus({ type: 'success', msg: 'Recebemos seu pedido. Vamos chamar você no WhatsApp em breve.' })
    setForm({ nome: '', telefone: '', tipo: 'Conserto', modelo: '', descricao: '' })
  }

  return (
    <>
      <header className="site-header">
        <div className="logo"><Logo /> Reconecta Cel</div>
        <button className="header-cta" onClick={scrollToForm}>Pedir orçamento</button>
      </header>

      <section className="hero">
        <div className="wrap">
          <span className="hero-eyebrow">Conserto e venda de celulares</span>
          <h1>Todo celular tem uma segunda história pra contar</h1>
          <p className="sub">
            Conserto com cuidado e vendo aparelhos usados testados e confiáveis, direto de casa
            pra você. Sem enrolação, sem letra miúda.
          </p>
          <button className="btn-primary" onClick={scrollToForm}>Pedir orçamento grátis</button>
          <p className="hero-note">Não reconectamos só telas. Reconectamos pessoas.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="section-title">O que eu faço por você</h2>
          <p className="section-sub">Conserto e venda, com o mesmo cuidado nos dois.</p>
          <div className="services">
            <div className="service-card">
              <span className="service-tag">Conserto</span>
              <h3>Reparo de celulares</h3>
              <p>Troca de tela, bateria, conector de carga e outros reparos, com avaliação sem compromisso antes de qualquer serviço.</p>
              <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }} onClick={scrollToForm}>Pedir avaliação</button>
            </div>
            <div className="service-card">
              <span className="service-tag">Venda</span>
              <h3>Celulares usados testados</h3>
              <p>Aparelhos revisados e testados antes de chegar até você, com preço justo e transparência total sobre o estado de cada um.</p>
              <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }} onClick={scrollToForm}>Ver disponíveis</button>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-band">
        <div className="wrap">
          <h2 className="section-title">Por que confiar</h2>
          <div className="trust-items">
            <div className="trust-item">
              <div className="num">Avaliação</div>
              <p>Sem compromisso, você só decide depois de saber o valor</p>
            </div>
            <div className="trust-item">
              <div className="num">Testado</div>
              <p>Todo aparelho é revisado antes de sair da minha mão</p>
            </div>
            <div className="trust-item">
              <div className="num">Em casa</div>
              <p>Atendimento direto, sem intermediário, sem loja anônima</p>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section" id="form">
        <div className="form-card">
          <h2>Peça seu orçamento</h2>
          <p className="sub">Conserto ou interesse em comprar — me conta o que você precisa.</p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="nome">Seu nome</label>
              <input
                id="nome"
                type="text"
                placeholder="Como você se chama?"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="telefone">WhatsApp</label>
              <input
                id="telefone"
                type="text"
                placeholder="(51) 9XXXX-XXXX"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="tipo">O que você precisa</label>
              <select
                id="tipo"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option>Conserto</option>
                <option>Comprar aparelho usado</option>
                <option>Vender meu aparelho</option>
                <option>Outro</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="modelo">Modelo do celular</label>
              <input
                id="modelo"
                type="text"
                placeholder="Ex: iPhone 12, Samsung A54..."
                value={form.modelo}
                onChange={(e) => setForm({ ...form, modelo: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="descricao">O que houve com o aparelho</label>
              <textarea
                id="descricao"
                rows="3"
                placeholder="Ex: tela trincada, não liga, bateria viciada..."
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              />
            </div>
            <button className="btn-primary" style={{ width: '100%' }} type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar pedido'}
            </button>
            {status && <div className={`form-status ${status.type}`}>{status.msg}</div>}
          </form>
          <p className="form-footnote">
            Prefere falar direto? <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">Chama no WhatsApp</a>
          </p>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} Reconecta Cel — conserto e venda de celulares usados.
      </footer>
    </>
  )
}
