import { Layout } from 'antd';
import PublicLayoutWrapper from './styles';
const { Content } = Layout;

const PublicLayout = ({ children }) => (
  <PublicLayoutWrapper>
    <Layout className="layout">
      <Content className="main-img">
        <img src="/img-intro-login.png" id="content" alt="Content Auth" />
      </Content>
      <div className="main-content">
        <img alt="" src="/logo.png" className="auth-service-layout__logo" />
        <div className="auth-service-layout__content">{children}</div>
      </div>
    </Layout>
  </PublicLayoutWrapper>
);

export default PublicLayout;
