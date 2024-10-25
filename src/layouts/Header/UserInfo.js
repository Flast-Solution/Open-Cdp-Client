import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GlobalOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import useGetMe from 'hooks/useGetMe';
import moment from 'moment';
import { MenuStyles } from './styles';

const LANGUAGE = [
  { value: 'en', text: 'EN' },
  { value: 'vi', text: 'VI' }
];

function UserInfo() {

  const { t, i18n } = useTranslation();
  const [ locale, setLocale ] = useState(i18n.language);
  const { user: profile } = useGetMe();
  const changeLocale = useCallback(e => {
    setLocale(e);
    i18n.changeLanguage(e);
    moment.locale(e);
    localStorage.setItem('locale', e);
  }, [i18n]);

  const getClassItemLanguage = useCallback(
    language =>
      locale?.includes(language)
        ? 'localeSelect active language-item'
        : 'localeSelect language-item',
    [locale],
  );

  const handleLogout = () => {
    localStorage.removeItem('jwt_access_token');
    window.location.href = '/login';
  };

  const userDropdown = (
    <MenuStyles>
      <Menu.Item key="profile">
        <div className="div-menu-item">
          <Link to="/profile" className="link-menu-item">
            <div className="profile-menu-item">
              <ProfileOutlined className="icon-menu-item" />
              <span>{t('header.profile')}</span>
            </div>
          </Link>
        </div>
      </Menu.Item>
      <Menu.Item key="language">
        <div className="div-menu-item">
          <GlobalOutlined className="icon-menu-item" />
          { LANGUAGE.map(item => (
            <div
              key={item.value}
              className={getClassItemLanguage(item.value)}
              role="presentation"
              onClick={() => changeLocale(item.value)}
            >
              {item.text}
            </div>
          ))}
        </div>
      </Menu.Item>
      <Menu.Item onClick={handleLogout} key="logout">
        <div className="div-menu-item">
          <LogoutOutlined className="icon-menu-item" />
          {t('header.logout')}
        </div>
      </Menu.Item>
    </MenuStyles>
  );

  return (
    <div>
      <Dropdown overlay={userDropdown} trigger={['click']}>
        <div className="div-user-info">
          <span className="userInfo">
            <strong>{profile?.fullName ?? 'Flast Solution'}</strong>
            <span className="role">{profile?.type ?? 'Open-CDP'}</span>
          </span>
          <Avatar size="large" src={profile?.avatar} icon={<UserOutlined />} />
        </div>
      </Dropdown>
    </div>
  );
}

export default UserInfo;
