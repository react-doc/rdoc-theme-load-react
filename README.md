rdoc theme
---

```bash
npm install rdoc-theme-load-react --save
```

in markdown

```markdown
<!--DemoStart--> 
\```jsx
class Header extends Component {
  render() {
    return (
      <div>我是组件</div>
    );
  }
}
ReactDOM.render(
  <div>
    <Header />
    123
  </div>
, mountNode);
\```
<!--End-->
```