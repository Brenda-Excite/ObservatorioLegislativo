import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Col , Row} from "reactstrap";
import facebookIcon from "../../assets/images/facebook.png";
import instagramIcon from "../../assets/images/instagram.png";
import twitterIcon from "../../assets/images/twitter.png";
import { useAppSelector } from "../../hooks/redux-hooks";

interface Props {
    control: any;
    errors: any;
    setValue: any;
}

const FormSocialNetworks = ({ control, errors , setValue }: Props) => {
    const { politicianSelected } = useAppSelector((state) => state.politicians);
    const [socialNetworks, setSocialNetworks] = useState({
        facebook: false,
        twitter: false,
        instagram: false,
      });

      const { facebook, twitter, instagram } = socialNetworks;

      useEffect(() => {
        if (politicianSelected) {
          setSocialNetworks({
            facebook: politicianSelected.personal_account_facebook ? true : false,
            twitter: politicianSelected.account_twitter ? true : false,
            instagram: politicianSelected.account_instagram ? true : false,
          });
        }
        // eslint-disable-next-line 
      }, []);

      useEffect(() => {
          if(politicianSelected){
            setValue("fan_page_facebook", politicianSelected?.fan_page_facebook);
            setValue("no_followers_facebook", politicianSelected?.no_followers_facebook);
            setValue("personal_account_facebook",politicianSelected?.personal_account_facebook);
            setValue("account_twitter", politicianSelected?.account_twitter);
            setValue("no_followers_twitter",politicianSelected?.no_followers_twitter);
            setValue("account_instagram", politicianSelected?.account_instagram);
            setValue("no_followers_instagram",politicianSelected?.no_followers_instagram);
          }else{
            setValue("fan_page_facebook", '');
            setValue("no_followers_facebook",0);
            setValue("personal_account_facebook",'');
            setValue("account_twitter",'');
            setValue("no_followers_twitter",0);
            setValue("account_instagram", '');
            setValue("no_followers_instagram",0)
          }
          // eslint-disable-next-line 
      }, [])

      const handleChangeSocialNetworks = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        setSocialNetworks({
          ...socialNetworks,
          [target.name]: target.checked,
        });
       };

    return (
        <>
           <Form.Group as={Row} className="mt-3 mb-3">
                  <Col xs="3">
                    <img src={facebookIcon} width="40" alt="facebook" />
                  </Col>
                  <Col
                    xs="9"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Form.Label>¿Tienes Facebook?</Form.Label>
                    <Form.Check
                      inline
                      type="checkbox"
                      name="facebook"
                      onChange={(e) => handleChangeSocialNetworks(e)}
                      checked={facebook}
                    />
                  </Col>
                </Form.Group> 
                {facebook ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Cuenta Personal de Facebook*:</Form.Label>
                      <Controller
                        name="personal_account_facebook"
                        control={control}
                        render={({field})=>(
                         <Form.Control
                            {...field}
                            type="text"
                            placeholder="Ej: https://www.facebook.com/tu-cuenta-personal/"
                         />   
                        )}
                        rules={{required:true}}
                      />
                      
                      {errors.personal_account_facebook && (
                        <p>La Pagina de facebook es requerida.</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>FanPage de Facebook:</Form.Label>
                      <Controller
                        name="fan_page_facebook"
                        control={control}
                        render={({field})=>(
                         <Form.Control
                            {...field}
                            type="text"
                            placeholder="Ej: https://www.facebook.com/tu-pagina/"
                         />   
                        )}
                        rules={{required:false}}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Número de Seguidores:</Form.Label>
                      <Controller
                        name="no_followers_facebook"
                        control={control}
                        render={({field})=>(
                         <Form.Control
                            {...field}
                            min="1"
                            type="number"
                            placeholder="Ej: 35,000"

                         />   
                        )}
                        rules={{required:false}}
                      />
                    </Form.Group>
                  </>
                ) : null}

                <Form.Group as={Row} className="mt-3 mb-3">
                  <Col xs="3">
                    <img src={twitterIcon} width="40" alt="twitter" />
                  </Col>
                  <Col
                    xs="9"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Form.Label>¿Tienes Twitter?</Form.Label>
                    <Form.Check
                      inline
                      type="checkbox"
                      name="twitter"
                      onChange={(e) => handleChangeSocialNetworks(e)}
                      checked={twitter}
                    />
                  </Col>
                </Form.Group>
                {twitter ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Cuenta de Twitter*:</Form.Label>
                      <Controller
                        name="account_twitter"
                        control={control}
                        render={({field})=>(
                         <Form.Control
                           {...field}
                            type="text"
                            placeholder="Ej: https://twitter.com/tu pagina"

                         />   
                        )}
                        rules={{required:true}}
                      />
                      {errors.account_twitter && (
                        <p>La cuenta de twitter es requerida.</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Número de Seguidores:</Form.Label>
                      <Controller
                        name="no_followers_twitter"
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type="number"
                            min="0"
                            placeholder="Ej: 35,000"
                          />
                        )}
                        rules={{ required: false }}
                      />
                      {errors.no_followers_twitter && (
                        <p>El número de seguidores de twitter es requerido.</p>
                      )}
                    </Form.Group>
                  </>
                ) : null}

                <Form.Group as={Row} className="mt-3 mb-3">
                  <Col xs="3">
                    <img src={instagramIcon} width="40" alt="instagram" />
                  </Col>
                  <Col
                    xs="9"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Form.Label>¿Tienes Instagram?</Form.Label>
                    <Form.Check
                      inline
                      type="checkbox"
                      name="instagram"
                      onChange={(e) => handleChangeSocialNetworks(e)}
                      checked={instagram}
                    />
                  </Col>
                </Form.Group>
                {instagram ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Cuenta de Instagram*:</Form.Label>
                      <Controller
                        name="account_instagram"
                        control={control}
                        render={({field})=>(
                         <Form.Control
                           {...field}
                            type="text"
                            placeholder="Ej: https://www.instagram.com/tu-perfil/"
                         />   
                        )}
                        rules={{required:true}}
                      />
                      {errors.account_instagram && (
                        <p>La cuenta de instagram es requerida.</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Número de Seguidores:</Form.Label>
                      <Controller
                        name="no_followers_instagram"
                        control={control}
                        render={({field})=>(
                         <Form.Control
                            {...field}
                            type="number"
                            min="0"
                            placeholder="Ej: 35,000"
                         />   
                        )}
                        rules={{required:false}}
                      />
                    </Form.Group>
                  </>
                ) : null}
        </>
    );
};

export default FormSocialNetworks;