import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import addressApi from '~/api/AddressApi';
import styles from './Address.module.scss';

function District({ handleClose }) {
  const { IdProvince, IdDistrict } = useParams();
  const [district, setDistrict] = useState([]);

  var a;
  useEffect(() => {
    const fetchDistrict = async () => {
      const districtList = await addressApi.getDistrict(IdProvince);
      setDistrict(districtList.district);
    };
    fetchDistrict();
  }, [IdProvince]);
  return (
    <ul className={styles.ul}>
      <li className={styles.district} onClick={handleClose}>
        <Link to={''}>Tất cả</Link>
      </li>
      {district.map((result) => (
        <li key={result.IdDistrict} className={styles.district}>
          <Link
            to={`/cho-thue-phong-tro/${IdProvince}/${result.IdDistrict}`}
          >{`${result.DistrictPrefix} ${result.DistrictName}`}</Link>
        </li>
      ))}
    </ul>
  );
}

export default District;
