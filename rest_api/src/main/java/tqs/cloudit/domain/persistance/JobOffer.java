package tqs.cloudit.domain.persistance;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author joaoalegria
 */
@Entity
@Table(name="joboffer")
public class JobOffer {
    /**
     * Internal Id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    /**
     * Job name
     */
    private String name;
    
    /**
     * Job area
     */
    private String area;
    
    /**
     * Job amount
     */
    private Integer amount;
    
    /**
     * Job deliver date
     */
    private String date;
    
    /**
     * Job creator
     */
    private String creator;

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    
    public JobOffer(tqs.cloudit.domain.rest.JobOffer jobOffer) {
        this.name = jobOffer.getName();
        this.area = jobOffer.getArea();
        this.amount = jobOffer.getAmount();
        this.date = jobOffer.getDate();   
    }

    public JobOffer() {
    }
    
    
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
    
}
