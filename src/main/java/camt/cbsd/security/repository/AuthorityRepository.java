package camt.cbsd.security.repository;

import camt.cbsd.entity.security.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Dto on 17-Apr-17.
 */
@Repository
public interface AuthorityRepository extends JpaRepository <Authority,Long> {
}
