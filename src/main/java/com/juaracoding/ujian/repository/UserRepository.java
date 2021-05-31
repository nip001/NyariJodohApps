package com.juaracoding.ujian.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.juaracoding.ujian.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	@Query(value="SELECT * from user where username=?1 and nohp=?2",nativeQuery = true)
	User findByLogin(String username, String nohp);

	@Query(value="SELECT * from user where jeniskelamin=?1",nativeQuery = true)
	List<User> findByGender(String gender);
}
