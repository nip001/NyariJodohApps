package com.juaracoding.ujian.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.juaracoding.ujian.model.Jodoh;

public interface JodohRepository extends JpaRepository<Jodoh, Long>{
	List<Jodoh> findByIduser(int iduser);
	
	@Query(value="SELECT * FROM `jodoh` INNER JOIN user ON user.id = jodoh.idjodoh WHERE jodoh.iduser = ?1",nativeQuery = true)
	List<Jodoh> findByTarget(int iduser);
}
