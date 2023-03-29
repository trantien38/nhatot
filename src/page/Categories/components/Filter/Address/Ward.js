import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import addressApi from '~/api/AddressApi';
import styles from './Address.module.scss';

function Ward({ handleClose }) {
  const { IdProvince, IdDistrict } = useParams();

  const [ward, setWard] = useState([]);
  useEffect(() => {
    const fetchWard = async () => {
      console.log(123);
      const wardList = await addressApi.getWard(IdDistrict);
      console.log(wardList.ward);
      setWard(wardList.ward);
    };
    fetchWard();
  }, [IdDistrict]);
  return (
    <ul className={styles.ul}>
      <li className={styles.district} onClick={handleClose}>
        <Link to={''}>Tất cả</Link>
      </li>
      {ward.map((result) => (
        <li key={result.IdWard} className={styles.district}>
          <Link
            to={`/cho-thue-phong-tro/${IdProvince}/${IdDistrict}/${result.IdWard}`}
          >{`${result.WardPrefix} ${result.WardName}`}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Ward;
