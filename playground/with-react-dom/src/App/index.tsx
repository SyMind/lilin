import { Button } from 'lilin';
import styles from './index.module.scss';

function App() {
  return (
    <div className={styles.container}>
        <div>按钮类型</div>
        <div className={styles.row}>
            <Button type="primary">主要按钮</Button>
            <Button type="info">信息按钮</Button>
            <Button type="default">默认按钮</Button>
            <Button type="danger">危险按钮</Button>
            <Button type="warning">警告按钮</Button>
            <Button type="success">成功按钮</Button>
        </div>

        <div>朴素按钮</div>
        <div>
            <Button plain type="primary">朴素按钮</Button>
            <Button plain type="info">朴素按钮</Button>
        </div>

        <div>禁用状态</div>
        <div>
            <Button disabled type="primary">禁用状态</Button>
            <Button plain disabled type="info">禁用状态</Button>
            <Button plain disabled type="primary">禁用状态</Button>
        </div>

        <div>按钮形状</div>
        <div>
            <Button shape="square" type="primary">方形按钮</Button>
            <Button type="info">圆形按钮</Button>
        </div>
    </div>
  );
}

export default App;
