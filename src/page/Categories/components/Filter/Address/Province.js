import { PersonAddAlt1 } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import addressApi from '~/api/AddressApi';
import styles from './Address.module.scss';

function Province({ handleClose }) {
  const [province, setProvince] = useState([]);
  useEffect(() => {
    const fetchProvince = async () => {
      const provinceList = await addressApi.getProvince();
      setProvince(provinceList.province);
    };
    fetchProvince();
  }, []);

  return (
    <ul className={styles.ul}>
      <li className={styles.district} onClick={handleClose}>
        <Link to={''}>Tất cả</Link>
      </li>
      {province.map((result) => (
        <li key={result.IdProvince} className={styles.district}>
          <Link to={`/cho-thue-phong-tro/${result.IdProvince}`}>{result.ProvinceName}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Province;
