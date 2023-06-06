import { useForm, SubmitHandler } from "react-hook-form";
import { startLoginEmailPassword } from "../../actions/authActions";
import {
  Container,
  Row,
  Form,
  Button,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useEffect } from "react";
type Inputs = {
  email: string;
  password: string;
};
const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.ui);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    dispatch(startLoginEmailPassword(email, password));
  };
  useEffect(() => {
    document.title = "Observatorio Dashboard-Login";
  }, []);
  useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);

  return (
    <div className="main-content">
      <div className="header bg-gradient-info py-8 py-lg-8">
        <Container>
          <div className="header-body text-center mb-3">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white">
                  Bienvenido a Observatorio Legislativo
                </h1>
              </Col>
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>

      <Container className="mt-n8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)} role="form">
                  <div className="text-center text-muted mb-4">
                   <img
                        alt="google"
                        src={require("../../assets/images/logo.png").default}
                        width="100"
                      />
                  </div>
                  <div className="text-center text-muted mb-4">
                    <h2>Inicia Sesión</h2>
                  </div>
                  <Form.Group className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroup.Text>
                        <i className="fas fa-envelope-square" />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Ingresa tu correo"
                        {...register("email", {
                          required: true,
                        })}
                      />
                    </InputGroup>
                    {errors.email && <p className="text-danger">El correo es requerido</p>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroup.Text>
                        <i className="fas fa-lock"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        {...register("password", {
                          required: true,
                        })}
                      />
                    </InputGroup>
                    {errors.password && <p className="text-danger">La contraseña es requerida</p>}
                  </Form.Group>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="submit"
                      disabled={loading}
                    >
                      Ingresar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginScreen;
