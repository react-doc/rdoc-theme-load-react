import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import * as Babel from '@babel/standalone';
import styles from './style/Canvas.less';

export default class Canvas extends PureComponent {
  constructor() {
    super();
    this.state = {
      height: 0,
    };
    this.playerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
  }
  componentDidMount() {
    if (/^__dome__/.test(this.props.value) && /^(js|jsx|javascript)$/.test(this.props.language)) {
      let code = this.props.value.replace(/__dome__/, '');
      const args = ['context', 'React', 'ReactDOM', 'Component'];
      const argv = [this, React, ReactDOM, Component];
      code = code.replace('mountNode', `document.getElementById('${this.playerId}')`);
      const codeNode = Babel.transform(code, { presets: ['es2015', 'react'] }).code;
      args.push(codeNode);
      new Function(...args).apply(null, argv); // eslint-disable-line
    }
  }
  onClick() {
    this.setState({
      height: this.state.height === 0 ? this.codeDom.clientHeight : 0,
    });
  }
  render() {
    const code = this.props.value.replace(/__dome__/, '');
    const PreCode = height => (
      <pre className={styles.highlight} style={{ height }}>
        <code ref={node => this.codeDom = node } className={classNames('hljs', { [`language-${this.props.language}`]: this.props.language })}>
          {code}
        </code>
      </pre>
    );
    if (/^__dome__/.test(this.props.value)) {
      return (
        <div className={styles.demo}>
          <div className={styles.demoBody} id={this.playerId}>
            {/^(html|htm)$/.test(this.props.language) && <div dangerouslySetInnerHTML={{ __html: code }} />}
          </div>
          {PreCode(this.state.height)}
          <div className={styles.demoControl} onClick={this.onClick.bind(this)}>
            {this.state.height === 0 ? '显示' : '隐藏' }代码
          </div>
        </div>
      );
    }
    return PreCode();
  }
}
