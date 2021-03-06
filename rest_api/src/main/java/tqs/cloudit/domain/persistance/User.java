package tqs.cloudit.domain.persistance;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author aspedrosa
 */
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String username;

    @JsonIgnore
    private String password;

    private String name;

    private String email;
    
    private String type;
    
    @OneToMany(mappedBy="creator", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Job> myOffers = new HashSet<>();
    
    @OneToMany(mappedBy="worker", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Job> acceptedOffers = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
        name = "UserArea", 
        joinColumns = @JoinColumn(name = "userId"), 
        inverseJoinColumns = @JoinColumn(name = "areaId"))
    private Set<Area> interestedAreas;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
        name = "UserFavouriteJobs",
        joinColumns = @JoinColumn(name = "userId"),
        inverseJoinColumns = @JoinColumn(name = "jobId"))
    private Set<Job> favouriteJobs = new HashSet<>();

    public User(tqs.cloudit.domain.rest.User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.name = user.getName();
        this.email = user.getEmail();
        this.type = user.getType();
        this.interestedAreas = new HashSet<>();
        if(user.getInterestedAreas()!=null){
            for(String area : user.getInterestedAreas()){
                this.interestedAreas.add(new Area(area));
            }
        }
    }

    public User() {}
    
    public void addNewOffer(Job jo){
        this.myOffers.add(jo);
    }
    
    public void removeOffer(Job jo){
        this.myOffers.remove(jo);
    }
    
    public void addAcceptedOffer(Job jo){
        this.acceptedOffers.add(jo);
    }
    
    public void removeAcceptedOffer(Job jo){
        this.acceptedOffers.remove(jo);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Area> getInterestedAreas() {
        return interestedAreas;
    }
    
    public void setInterestedAreas(Set<String> interestedAreas) {
        this.interestedAreas.clear();
        if(interestedAreas!=null){
            for(String area : interestedAreas){
                this.interestedAreas.add(new Area(area));
            }
        }
    }

    public Set<Job> getMyOffers() {
        return myOffers;
    }

    public void setMyOffers(Set<Job> myOffers) {
        this.myOffers = myOffers;
    }

    public Set<Job> getAcceptedOffers() {
        return this.acceptedOffers;
    }

    public void setAcceptedOffers(Set<Job> acceptedOffers) {
        this.acceptedOffers = acceptedOffers;
    }

    public Set<Job> getFavouriteJobs() {
        return favouriteJobs;
    }

    public void setFavouriteJobs(Set<Job> favouriteJobs) {
        this.favouriteJobs = favouriteJobs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        User user = (User) o;
        return Objects.equals(username, user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }
}
