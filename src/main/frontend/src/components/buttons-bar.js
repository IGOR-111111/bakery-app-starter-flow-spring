import { html, css, LitElement } from 'lit';

/**
 * `<buttons-bar>` é um componente Lit que cria uma barra de botões
 * com três áreas (slots): left, info e right.
 *
 * Funcionalidades principais:
 * - Flexbox para organizar os elementos
 * - Box-shadow que pode ser removido com o atributo `no-scroll`
 * - Responsivo para telas pequenas (≤ 600px)
 *
 * Slots:
 * @slot left - Área para botões ou elementos alinhados à esquerda
 * @slot info - Área central/direita para informações ou indicadores
 * @slot right - Área para botões ou elementos alinhados à direita
 *
 * Atributos:
 * @attr no-scroll - Remove o box-shadow superior
 */
class ButtonsBarElement extends LitElement {
  /**
   * Define os estilos CSS do componente.
   * @returns {import('lit').CSSResult} Os estilos do componente
   */
  static get styles() {
    return css`
      :host {
        flex: none;
        display: flex;
        flex-wrap: wrap;
        transition: box-shadow 0.2s;
        justify-content: space-between;
        padding-top: var(--lumo-space-s);
        align-items: baseline;
        box-shadow: 0 -3px 3px -3px var(--lumo-shade-20pct);
      }

      :host([no-scroll]) {
        box-shadow: none;
      }

      :host ::slotted([slot='info']),
      .info {
        text-align: right;
        flex: 1;
      }

      ::slotted(vaadin-button) {
        margin: var(--lumo-space-xs);
      }

      @media (max-width: 600px) {
        :host ::slotted([slot='info']) {
          order: -1;
          min-width: 100%;
          flex-basis: 100%;
        }
      }
    `;
  }

  /**
   * Renderiza o template HTML do componente.
   * @returns {import('lit').TemplateResult} O template do componente
   */
  render() {
    return html`
      <slot name="left"></slot>
      <slot name="info"><div class="info"></div></slot>
      <slot name="right"></slot>
    `;
  }

  /**
   * Nome do elemento customizado.
   * @returns {string} Nome do componente
   */
  static get is() {
    return 'buttons-bar';
  }
}

// Registra o componente como elemento customizado
customElements.define(ButtonsBarElement.is, ButtonsBarElement);
