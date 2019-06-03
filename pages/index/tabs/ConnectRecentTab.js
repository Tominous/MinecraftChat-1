import useForm from '../hooks/useForm';
import useIsLogin from '../hooks/useIsLogin';

import { Header, Divider, Form, Button } from "semantic-ui-react";
import CheckTableHOC from '../components/CheckTable';

import './ConnectRecentTab.scss';

function ConnectRecentTab(props) {
  const IsLogin = useIsLogin(props.socket);

  const [indeies, handleChange, handleSubmit] = useForm({
    profile: {},
    server: {}
  }, (indeies) => {
    if (IsLogin == false && props.socket) {
      const send_datas = {
        _id: props.profiles[indeies.profile]._id,
        username: props.profiles[indeies.profile].username,
        host: props.servers[indeies.server].host,
        port: props.servers[indeies.server].port,
        version: props.servers[indeies.server].version,
      };
      props.socket.emit('server:connect', { method: 'session', ...send_datas });

      handleChange({}, { name: 'profile', value: '-1' });
      handleChange({}, { name: 'server', value: '-1' });
    }
  });

  return (
    <div id="connect-quickly-container" className="mcc-tab-container">
      <Form onSubmit={handleSubmit} inverted={props.dark_mode}>
        <Header inverted={props.dark_mode} size='huge'>Profiles</Header>
        <Divider inverted={props.dark_mode}></Divider>
        <CheckTableHOC
          dark_mode={props.dark_mode}
          name="profile" indeies={indeies}
          handleChange={handleChange}
          datas={props.profiles} displays={[
            { name: 'Username', key: 'username' },
            { name: 'Client Token', key: 'clientToken' }
          ]}
        />
        <Divider horizontal inverted={props.dark_mode}>AND</Divider>
        <Header inverted={props.dark_mode} size='huge'>Host</Header>
        <Divider inverted={props.dark_mode}></Divider>
        <CheckTableHOC
          dark_mode={props.dark_mode}
          name="server" indeies={indeies}
          handleChange={handleChange}
          datas={props.servers} displays={[
            { name: 'Host', key: 'host' },
            { name: 'Port', key: 'port' },
            { name: 'Version', key: 'version' }
          ]}
        />
        <Button type='submit' fluid color='grey' disabled={IsLogin}>Connect</Button>
      </Form>
    </div>
  );
}

export default ConnectRecentTab;
